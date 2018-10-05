import * as React from 'react';
import find = require('lodash/find');
import { t, ReactChildren } from '../../utils';
import { getArrayChildren } from '../utils';

import { Column as ColumnFDT } from 'fixed-data-table-2';

import { Cell, defaultCell, CellIntrinsicProps, Intrinsic as CellIntrinsic } from '../Cell/Cell';
import { Header, defaultHeader, HeaderIntrinsicProps, Intrinsic as HeaderIntrinsic } from '../Header/Header';
import Footer from '../Footer';

export type Intrinsic<T> = {
  data?: T[],
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
  sortable?: boolean,
  isResizable?: boolean,
  flexGrow?: number,
  children?: Column.ColumnChildren<T, K>
};

export namespace Column {
  export type ColumnChildren<T, K extends string> = (
    React.ReactElement<Header.Props> |
    React.ReactElement<Footer.Props> |
    React.ReactElement<Cell.Props<T, K>>
  )[]
  export type Props<T, K extends string> = Required<T, K> & Partial<Default>;
}
export type ColumnDefaultedIntrinsicProps<T, K extends string> = Required<T, K> & Default & Intrinsic<T>;
export type ColumnIntrinsicProps<T, K extends string> = Column.Props<T, K> & Intrinsic<T>;

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
  sortable: maybe(t.Boolean),
  isResizable: maybe(t.Boolean)
}, { strict: true });

export const Column = <T, K extends string>(args: Column.Props<T, K>): React.ReactElement<Column.Props<T, K>> => {
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

  const cell = ({ rowIndex, columnKey }: { rowIndex: number, columnKey?: string }) => {
    const elem: React.ReactElement<CellIntrinsicProps<T, K>> = find(getArrayChildren(children), child => child.type === Cell) || defaultCell;
    const rowData = data[rowIndex] || {};
    const dataCell = rowData[columnKey || ''];
    return React.cloneElement<CellIntrinsicProps<T, K>, CellIntrinsic<T, K>>(elem, { data: dataCell, rowData, rowIndex, fixed });
  };

  const header = React.cloneElement<HeaderIntrinsicProps<K>, HeaderIntrinsic>(find(getArrayChildren(children), child => child.type === Header) || defaultHeader(name), { fixed });
  const footer = find(getArrayChildren(children), child => child.type === Footer) as React.ReactElement<Footer.Props> | undefined; // TODO onFooterClick

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
