import React from 'react';
import cx from 'classnames';
import t, { maybe } from 'tcomb';
import { props  } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Table } from 'fixed-data-table-2';
import Column, { defaultColumns, updateColumns } from './Column';
import FlexView from 'react-flexview';

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
 * @param onRowMouseEnter - callback to be called when mouse enters a row
 * @param onRowMouseLeave - callback to be called when mouse leaves a row
 * @param autosize - wheater the table should resize to fit the available space
 * @param columnsOrder - an array containing the ordered list of column names, in the same order they should be rendered
 * @param onColumnsReorder - callback to be called when the order of columns changes after dragging an header in a new position
 * @param onColumnResize - callback to be called when a column is resized
 * @param children - table children (Column or ColumnGroup)
 * @param scrollLeft - value of horizontal scroll
 * @param scrollTop - value of vertical scroll
 * @param onScrollStart - callback to be called when scrolling starts
 * @param onScrollEnd - callback to be called when scrolling ends
 * @param selectedRows - the list of selected row ids
 * @param onRowsSelect - callback to be called when the currently selected rows change
 * @param selectionType - single = only one selected row at a time, multi = multiple selection, none = selection disabled
 * @param hoveredRowIndex - the id of the hovered row
 * @param onHoverRowChange - callback to be called when the hovered row changes
 * @param sortBy - id of the column according which the data should be ordered
 * @param sortDir - sorting direction
 * @param onSortChange - callback to be called when sorting change
 *
 * @param scrollToRow - Private
 * @param onRowClick - Private
 * @param rowClassNameGetter - Private
 * @param onColumnResizeEndCallback - Private
 * @param isColumnResizing - Private
 */
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
  onRowMouseEnter: maybe(t.Function),
  onRowMouseLeave: maybe(t.Function),
  scrollLeft: maybe(t.Integer),
  scrollTop: maybe(t.Integer),
  onScrollStart: maybe(t.Function),
  onScrollEnd: maybe(t.Function),
  children: t.ReactChildren,

  // private
  scrollToRow: maybe(t.Integer),
  onRowClick: maybe(t.Function),
  rowClassNameGetter: maybe(t.Function),
  onColumnResizeEndCallback: maybe(t.Function),
  isColumnResizing: maybe(t.Boolean)
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
