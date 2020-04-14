import * as React from "react";
import find = require("lodash/find");
import { getArrayChildren } from "../utils";

import { Column as ColumnFDT } from "fixed-data-table-2";

import { Cell, defaultCell } from "../Cell/Cell";
import { Header, defaultHeader, HeaderIntrinsicProps } from "../Header/Header";
import Footer from "../Footer";

export type Intrinsic<T> = {
  data?: T[];
  sortDir?: "asc" | "desc";
  onHeaderClick: () => void;
};

export type Default = {
  width: number;
  allowCellsRecycling: boolean;
  fixed: boolean;
};

export type Required<T> = {
  key?: string | number;
  name: string;
  sortable?: boolean;
  isResizable?: boolean;
  flexGrow?: number;
  children?: Column.ColumnChildren<T>;
};

export namespace Column {
  export type ColumnChildren<T extends {}> = (
    | React.ReactElement<Header.Props>
    | React.ReactElement<Footer.Props>
    | React.ReactElement<Cell.Props<T, keyof T>>
  )[];
  export type Props<T extends {}> = Required<T> & Partial<Default>;
}
export type ColumnDefaultedIntrinsicProps<T> = Required<T> &
  Default &
  Intrinsic<T>;
export type ColumnIntrinsicProps<T extends {}> = Column.Props<T> & Intrinsic<T>;

export const defaultWidth = 200;

export const Column = <T extends {}>(
  args: Column.Props<T>
): React.ReactElement<Column.Props<T>> => {
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
  } = args as ColumnDefaultedIntrinsicProps<T>;

  const cell = ({
    rowIndex,
    columnKey
  }: {
    rowIndex: number;
    columnKey?: string;
  }) => {
    const elem =
      find(getArrayChildren(children), child => child.type === Cell) ||
      defaultCell;
    const rowData = data[rowIndex] || {};
    const dataCell = (rowData as any)[columnKey || ""];
    return React.cloneElement<any, any>(elem as any, {
      data: dataCell,
      rowData,
      rowIndex,
      fixed
    });
  };

  const header = React.cloneElement<HeaderIntrinsicProps>(
    find(getArrayChildren(children), child => child.type === Header) ||
      defaultHeader(name),
    { fixed }
  );
  const footer = find(
    getArrayChildren(children),
    child => child.type === Footer
  ) as React.ReactElement<Footer.Props> | undefined; // TODO onFooterClick

  return (
    <ColumnFDT
      key={key}
      columnKey={name}
      header={header}
      cell={cell as any}
      footer={footer}
      width={width}
      flexGrow={flexGrow}
      fixed={fixed}
      isResizable={isResizable}
      allowCellsRecycling={allowCellsRecycling}
    />
  );
};

export const defaultColumns = <T extends {}>(data: T[]) => {
  return data.length > 0
    ? ((Object.keys(data[0]) as unknown) as string[]).map(columnName =>
        Column<T>({ name: columnName })
      )
    : [];
};
