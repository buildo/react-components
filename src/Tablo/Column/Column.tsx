import * as React from 'react';
import find = require('lodash/find');
import { t, ReactChildren } from '../../utils';
import { getArrayChildren } from '../utils';

import { Column as ColumnFDT } from 'fixed-data-table-2';

import Cell, { defaultCell, CellProps, CellIntrinsicProps } from '../Cell';
import Header, { defaultHeader, HeaderProps, HeaderIntrinsicProps } from '../Header';
import Footer, { FooterProps } from '../Footer';

export namespace ColumnProps {

  export type ColumnChildren<T, K extends string> = (
    React.ReactElement<HeaderProps> |
    React.ReactElement<FooterProps> |
    React.ReactElement<CellProps<T, K>>
  )[]

  export type Intrinsic<T> = {
    data?: T[],
    sortable?: boolean,
    sortDir?: 'asc' | 'desc',
    onHeaderClick: () => void
  }

  export type Default = {
    width: number,
    allowCellsRecycling: boolean
    fixed: boolean
  }

  export type Required<T, K extends string> = {
    key?: string | number
    name: K,
    isResizable?: boolean,
    flexGrow?: number,
    children?: ColumnChildren<T, K>
  }
};

export type ColumnProps<T, K extends string> = ColumnProps.Required<T, K> & Partial<ColumnProps.Default>;
export type ColumnDefaultedIntrinsicProps<T, K extends string> = ColumnProps.Required<T, K> & ColumnProps.Default & ColumnProps.Intrinsic<T>;
export type ColumnIntrinsicProps<T, K extends string> = ColumnProps<T, K> & ColumnProps.Intrinsic<T>;

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

const Column = <T, K extends string>(args: ColumnProps<T, K>): React.ReactElement<ColumnProps<T, K>> => {
  const {
    key,
    width = defaultWidth,
    flexGrow,
    data = [],
    name,
    fixed,
    isResizable,
    children = [],
    allowCellsRecycling = true
  } = argsTypes(args) as ColumnDefaultedIntrinsicProps<T, K>;

  const cell = ({ rowIndex, columnKey }: { rowIndex: number, columnKey: string }) => {
    const elem: React.ReactElement<CellIntrinsicProps<T, K>> = find(getArrayChildren(children), child => child.type === Cell) || defaultCell;
    const rowData = data[rowIndex] || {};
    const dataCell = rowData[columnKey];
    return React.cloneElement<CellIntrinsicProps<T, K>, CellProps.Intrinsic<T, K>>(elem, { data: dataCell, rowData, rowIndex, fixed });
  };

  const header = React.cloneElement<HeaderIntrinsicProps<K>, HeaderProps.Intrinsic>(find(getArrayChildren(children), child => child.type === Header) || defaultHeader(name), { fixed });
  const footer = find(getArrayChildren(children), child => child.type === Footer) as React.ReactElement<FooterProps> | undefined; // TODO onFooterClick

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
