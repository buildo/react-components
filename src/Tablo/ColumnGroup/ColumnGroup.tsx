import * as React from 'react';
import { t, ReactChildren } from '../../utils';
import find = require('lodash/find');

import { ColumnGroup as ColumnGroupFDT } from 'fixed-data-table-2';

import Header, { defaultHeader } from '../Header';
import Column, { ColumnProps } from '../Column';

export type ColumnGroupProps<T> = {
  key: string | number,
  children: React.ReactElement<ColumnProps<T, keyof T>>[],
  fixed?: boolean,
  sortable?: boolean
}

const { union, maybe, struct } = t;
const argsTypes = struct({
  key: union([t.String, t.Number]),
  fixed: maybe(t.Boolean),
  children: ReactChildren
}, { strict: true, name: 'ColumnGroupProps' });

function ColumnGroup<T>(args: ColumnGroupProps<T>) {
  const {
    key,
    fixed,
    children
  } = argsTypes(args) as ColumnGroupProps<T>;

  const header = find(children, child => child.type === Header) || defaultHeader('');
  const columns = children
    .filter(ch => ch.type === Column)
    .map((col, key) => {
      const colProps: ColumnProps<T, keyof T> = {
        key,
        ...col.props,
        fixed
      };
      return Column<T, keyof T>({...colProps});
    });

  return (
    <ColumnGroupFDT
      key={key}
      header={header}
      fixed={fixed}
    >
      {columns}
    </ColumnGroupFDT>
  );
}

export default ColumnGroup;
