import * as React from "react";
import { t, ReactChildren } from "../../utils";
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

const { union, maybe, struct } = t;
const argsTypes = struct(
  {
    key: union([t.String, t.Number]),
    fixed: maybe(t.Boolean),
    children: ReactChildren
  },
  { strict: true, name: "ColumnGroupProps" }
);

export function ColumnGroup<T>(args: ColumnGroup.Props<T>) {
  const { key, fixed, children } = argsTypes(args) as ColumnGroup.Props<T>;

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
