import React from 'react';
import cx from 'classnames';
import t, { maybe } from 'tcomb';
import { props  } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Table } from 'fixed-data-table-2';
import Column, { defaultColumns, updateColumns } from './Column';
import FlexView from 'react-flexview';
import { autosize, columnsResize, columnsReorder, scrollable, selectable, sortable } from './plugins';

export const defaultWidth = 500;

/** A table component based on fixed-data-table-2
 * @param data - data shown in the table
 * @param defaultColumns - a function that returns the default columns given the data
 * @param width - the desired width of the table
 * @param height - the desired height of the table
 * @param rowHeight - height in pixel of every row
 * @param headerHeight - height in pixel of header
 * @param groupHeaderHeight - height in pixel of groupHeader
 * @param footerHeight - height in pixel of footer
 * @param children - content
 */
@autosize
@columnsReorder
@columnsResize
@scrollable
@selectable
@sortable
@skinnable()
@pure
@props({
  // public
  className: maybe(t.String),
  data: t.Array,
  defaultColumns: maybe(t.Function),
  width: t.Number,
  height: t.Number,
  rowHeight: t.Number,
  headerHeight: t.Number,
  groupHeaderHeight: t.Number,
  footerHeight: t.Number,
  children: t.ReactChildren,
  onRowMouseEnter: maybe(t.Function),
  onRowMouseLeave: maybe(t.Function),

  // private
  isColumnResizing: maybe(t.Boolean),
  onColumnResizeEndCallback: maybe(t.Function),
  onRowClick: maybe(t.Function),
  scrollToRow: maybe(t.Number),
  rowClassNameGetter: maybe(t.Function),
  onScrollEnd: maybe(t.Function),
  onScrollStart: maybe(t.Function),
  scrollLeft: maybe(t.Integer),
  scrollTop: maybe(t.Integer)
})
export default class Tablo extends React.Component {

  static defaultProps = {
    width: defaultWidth,
    height: 500,
    defaultColumns,
    rowHeight: 30,
    headerHeight: 40,
    groupHeaderHeight: 50,
    footerHeight: 0
  }

  getLocals({ data, children, ...tableProps }) {

    const columnsOrGroups = updateColumns(children || defaultColumns(data), ({ col }) => {
      return <Column {...{ key: col.props.name, ...col.props, data }} />;
    }).map((ch, key) => ch.type({ key, ...ch.props }));

    t.assert(
      columnsOrGroups.length === ([].concat(children) || Object.keys).length,
      'There are extraneous children in the Grid. One should use only Column or ColumnGroup'
    );

    const rowsCount = data.length;

    return {
      columnsOrGroups,
      rowsCount,
      ...tableProps
    };
  }

  template({ columnsOrGroups, className, ...tableProps }) {
    return (
      <FlexView ref='gridWrapper' column grow className={cx('grid', className)}>
        <Table {...tableProps}>
          {columnsOrGroups}
        </Table>
      </FlexView>
    );
  }

}
