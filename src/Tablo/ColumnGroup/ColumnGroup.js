import React from 'react';
import { t, ReactChildren } from '../../utils';
import find from 'lodash.find';

import { ColumnGroup as ColumnGroupFDT } from 'fixed-data-table-2';

import Header, { defaultHeader } from '../Header';
import Column from '../Column';

const { union, maybe, struct } = t;
const argsTypes = struct({
  key: union([t.String, t.Number]),
  fixed: maybe(t.Boolean),
  children: ReactChildren
}, { strict: true, name: 'ColumnGroupProps' });

const ColumnGroup = (args) => {

  const {
    key,
    fixed,
    children
  } = argsTypes(args);

  const header = find(children, child => child.type === Header) || defaultHeader();
  const columns = children
    .filter(ch => ch.type === Column)
    .map((col, key) => Column({
      key,
      ...col.props,
      fixed
    }));

  return (
    <ColumnGroupFDT
      key={key}
      header={header}
      fixed={fixed}
    >
      {columns}
    </ColumnGroupFDT>
  );
};

export default ColumnGroup;
