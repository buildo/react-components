import * as React from "react";
import find = require("lodash/find");

import { ColumnGroup as ColumnGroupFDT } from "fixed-data-table-2";

import Header, { defaultHeader } from "../Header";
import Column from "../Column";

export namespace ColumnGroup {
  export type Props<T> = {
    key: string | number;
    children: React.ReactElement<Column.Props<T>>[];
    fixed?: boolean;
    sortable?: boolean;
  };
}

export function ColumnGroup<T>(args: ColumnGroup.Props<T>) {
  const { key, fixed, children } = args;

  const header =
    find(children, child => child.type === Header) || defaultHeader("");
  const columns = children
    .filter(ch => ch.type === Column)
    .map((col, key) => {
      const colProps: Column.Props<T> = {
        key,
        ...col.props,
        fixed
      };
      return Column<T>({ ...colProps });
    });

  return (
    <ColumnGroupFDT key={key} header={header} fixed={fixed}>
      {columns}
    </ColumnGroupFDT>
  );
}
