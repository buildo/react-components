import React from 'react';
import find from 'lodash/find';
import { t, ReactChildren } from '../../utils';

import { Column as ColumnFDT } from 'fixed-data-table-2';

import Cell, { defaultCell } from '../Cell';
import Header, { defaultHeader } from '../Header';
import Footer from '../Footer';

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

const Column = (args) => {

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
  } = argsTypes(args);

  const cell = ({ rowIndex, columnKey }) => {
    const elem = find([].concat(children), child => child.type === Cell) || defaultCell;
    const rowData = data[rowIndex] || {};
    const dataCell = rowData[columnKey];
    return React.cloneElement(elem, { data: dataCell, rowData, rowIndex, fixed });
  };

  const header = React.cloneElement(find([].concat(children), child => child.type === Header) || defaultHeader(name), { fixed });

  const footer = find([].concat(children), child => child.type === Footer); // TODO onFooterClick

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
};

export const defaultColumns = (data) => Object.keys(data[0] || {}).map(columnName => <Column name={columnName} />);
export default Column;
