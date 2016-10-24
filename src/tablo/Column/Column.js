import React from 'react';
import t, { union, maybe, struct } from 'tcomb';
import find from 'lodash/find';

import { Column as ColumnFDT } from 'fixed-data-table-2';

import Cell, { defaultCell } from '../Cell';
import Header, { defaultHeader } from '../Header';
import Footer from '../Footer';

export const defaultWidth = 200;

const argsTypes = struct({
  key: union([t.String, t.Number]),
  width: maybe(t.Number),
  data: maybe(t.Array),
  name: t.String,
  fixed: maybe(t.Boolean),
  children: t.ReactChildren
}, { strict: true });

const Column = (args) => {

  const {
    key,
    width = defaultWidth,
    data = [],
    name,
    fixed,
    isResizable,
    children = []
  } = argsTypes(args);

  const cell = ({ rowIndex, columnKey }) => {
    const elem = find([].concat(children), child => child.type === Cell) || defaultCell;
    return React.cloneElement(elem, { data: (data[rowIndex] || {})[columnKey] });
  };

  const header = find([].concat(children), child => child.type === Header) || defaultHeader(name);

  const footer = find([].concat(children), child => child.type === Footer); // TODO onFooterClick

  return (
    <ColumnFDT
      key={key}
      columnKey={name}
      header={header}
      cell={cell}
      footer={footer}
      width={width}
      fixed={fixed}
      isResizable={isResizable}
    />
  );
};

export const defaultColumns = (data) => Object.keys(data[0] || {}).map(columnName => <Column name={columnName} />);
export default Column;
