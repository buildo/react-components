import React from 'react';
import cx from 'classnames';
import { skinnable, props, t, ReactChildren } from '../utils';
import { Table } from 'fixed-data-table-2';
import Column, { defaultColumns, updateColumns } from './Column';
import FlexView from 'react-flexview';

import './patch-fixed-data-table-2';

const { maybe } = t;

/** A table component based on fixed-data-table-2
 * @param data - data shown in the table
 * @param width - the desired width of the table. Unless autosize is false, this can be left undefined
 * @param height - the desired height of the table.  Unless autosize is false, this can be left undefined
 * @param rowHeight - height in pixel of every row
 * @param headerHeight - height in pixel of header
 * @param groupHeaderHeight - height in pixel of groupHeader
 * @param footerHeight - height in pixel of footer
 * @param onRowMouseEnter - callback to be called when mouse enters a row
 * @param onRowMouseLeave - callback to be called when mouse leaves a row
 * @param autosize - wheater the table should resize to fit the available space. Default true.
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
 * @param rowClassNameGetter - a function index -> className
 * @param touchScrollEnabled - enable touch scroll
 *
 * @param scrollToRow - Private
 * @param onRowClick - Private
 * @param onColumnResizeEndCallback - Private
 * @param isColumnResizing - Private
 */
@skinnable()
@props({
  // public
  className: maybe(t.String),
  data: t.Array,
  width: t.Number,
  height: t.Number,
  rowHeight: maybe(t.Number),
  headerHeight: maybe(t.Number),
  groupHeaderHeight: maybe(t.Number),
  footerHeight: maybe(t.Number),
  onRowMouseEnter: maybe(t.Function),
  onRowMouseLeave: maybe(t.Function),
  scrollLeft: maybe(t.Integer),
  scrollTop: maybe(t.Integer),
  onScrollStart: maybe(t.Function),
  onScrollEnd: maybe(t.Function),
  children: ReactChildren,
  rowClassNameGetter: maybe(t.Function),
  touchScrollEnabled: maybe(t.Boolean),

  // private
  scrollToRow: maybe(t.Integer),
  onRowClick: maybe(t.Function),
  onColumnResizeEndCallback: maybe(t.Function),
  isColumnResizing: maybe(t.Boolean)
})
export default class Tablo extends React.PureComponent {

  static defaultProps = {
    rowClassNameGetter: () => '',
    rowHeight: 30,
    headerHeight: 40,
    groupHeaderHeight: 50,
    footerHeight: 0
  }

  getLocals({ data, children, rowClassNameGetter: rcnGetter, ...tableProps }) {

    const columnsOrGroups = updateColumns(children || defaultColumns(data), ({ col }) => {
      return <Column {...{ key: col.props.name, ...col.props, data }} />;
    }).map((ch, key) => ch.type({ key, ...ch.props }));

    t.assert(
      columnsOrGroups.length === [].concat(children || Object.keys(data[0])).length,
      'There are extraneous children in the Grid. One should use only Column or ColumnGroup'
    );

    const rowClassNameGetter = (index) => {
      return cx('tablo-row', { 'tablo-row-even': index % 2 === 0, 'tablo-row-odd': index % 2 === 1 }, rcnGetter(index));
    };

    const rowsCount = data.length;

    return {
      columnsOrGroups,
      rowsCount,
      rowClassNameGetter,
      ...tableProps
    };
  }

  template({ columnsOrGroups, className, ...tableProps }) {
    return (
      <FlexView column grow className={cx('tablo', className)}>
        <Table {...tableProps}>
          {columnsOrGroups}
        </Table>
      </FlexView>
    );
  }

}
