import * as React from 'react';
import find = require('lodash/find');
import { t, ReactChildren } from '../../utils';

import { Column as ColumnFDT } from 'fixed-data-table-2';

import Cell, { defaultCell, CellProps, CellIntrinsicProps } from '../Cell';
import Header, { defaultHeader, HeaderProps, HeaderIntrinsicProps } from '../Header';
import Footer, { FooterProps } from '../Footer';

export namespace ColumnProps {

  export type ColumnChildren<T, K> = (
    React.ReactElement<HeaderProps> |
    React.ReactElement<FooterProps> |
    React.ReactElement<CellProps<T, K>>
  )[]

  export type Intrinsic<T> = {
    data?: T[],
  }

  export type Default = {
    width: number,
    allowCellsRecycling: boolean
    fixed: boolean
  }

  export type Required<T, K> = {
    key?: string | number
    name: K,
    isResizable?: boolean,
    flexGrow?: number,
    children?: ColumnChildren<T, K>
  }
};

export type ColumnProps<T, K> = ColumnProps.Required<T, K> & Partial<ColumnProps.Default>;
type ColumnDefaultedIntrinsicProps<T, K> = ColumnProps.Required<T, K> & ColumnProps.Default & ColumnProps.Intrinsic<T>;

const { union, maybe, struct } = t;
export const defaultWidth = 200;

const argsTypes = struct({
  key: union([t.String, t.Number]),
  width: maybe(t.Number),
  data: maybe(t.Array),
  name: t.String,
  fixed: maybe(t.Boolean),
  flexGrow: maybe(t.Number),
  children: ReactChildren,
  allowCellsRecycling: maybe(t.Boolean),

  isResizable: maybe(t.Boolean)
}, { strict: true });

const Column = <T, K extends keyof T>(args: ColumnProps<T, K>) => {
  const {
    key,
    width,
    flexGrow,
    data = [],
    name,
    fixed,
    isResizable,
    children = [],
    allowCellsRecycling
  } = argsTypes(args) as ColumnDefaultedIntrinsicProps<T, K>;

  const cell = ({ rowIndex, columnKey }: { rowIndex: number, columnKey: string | number}) => {
    const elem: React.ReactElement<CellIntrinsicProps<T, K>> = find(children, child => child.type === Cell) || defaultCell;
    const rowData = data[rowIndex] || {};
    const dataCell = rowData[columnKey];
    return React.cloneElement<CellIntrinsicProps<T, K>, CellProps.Intrinsic<T, K>>(elem, { data: dataCell, rowData, rowIndex, fixed });
  };

  const header = React.cloneElement<HeaderIntrinsicProps<T>, HeaderProps.Intrinsic>(find(children, child => child.type === Header) || defaultHeader(name), { fixed });
  const footer = find(children, child => child.type === Footer) as React.ReactElement<FooterProps> | undefined; // TODO onFooterClick

  return (
    <ColumnFDT
      key={key}
      columnKey={name}
      header={header}
      cell={cell}
      footer={footer}
      width={width}
      flexGrow={flexGrow}
      fixed={fixed}
      isResizable={isResizable}
      allowCellsRecycling={allowCellsRecycling}
    />
  );
}

export const defaultColumns = <T, K extends keyof T>(data: T[]) =>
  Object.keys(data[0] || {}).map((columnName: K) => Column<T, K>({ name: columnName }));

export default Column;
