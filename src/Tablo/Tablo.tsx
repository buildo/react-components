import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../utils';
import { Table, TableProps } from 'fixed-data-table-2';
import Column, { defaultColumns, updateColumns, ColumnProps } from './Column';
import FlexView from 'react-flexview';
import { ColumnGroupProps } from './ColumnGroup';
import omit = require('lodash/omit');

import './patch-fixed-data-table-2';

export namespace TabloProps {
  export type SortDir = 'asc' | 'desc';
}

export type TabloDefaultProps = {
  /** height in pixel of every row */
  rowHeight: number,
  /** height in pixel of header */
  headerHeight: number,
  /** height in pixel of groupHeader */
  groupHeaderHeight: number,
  /** height in pixel of footer */
  footerHeight: number,
  /**  a function giving a className for a row index */
  rowClassNameGetter: (rowIndex: number) => string | number | undefined | null,
  /** wheater the table should resize to fit the available space. Default true. */
  autosize: boolean
};

export type TabloRequiredProps<T, K extends keyof T> = {
  /** data shown in the table */
  data: T[],
  className?: string,
  /** callback to be called when mouse enters a row */
  onRowMouseEnter?: (rowIndex: number) => void,
  /** callback to be called when mouse leaves a row */
  onRowMouseLeave?: (rowIndex: number) => void,
  /** an array containing the ordered list of column names, in the same order they should be rendered */
  columnsOrder?: K[],
  /** callback to be called when the order of columns changes after dragging an header in a new position */
  onColumnsReorder?: (columns: K[]) => void,
  /** callback to be called when a column is resized */
  onColumnResize?: (x: { width: number, key: K}) => void,
  /** table children (Column or ColumnGroup) */
  children?: React.ReactElement<ColumnProps<T, K>>[] | React.ReactElement<ColumnGroupProps<T>>[],
  /** value of horizontal scroll */
  scrollLeft?: number,
  /** value of vertical scroll */
  scrollTop?: number,
  /** callback to be called when scrolling starts */
  onScrollStart?: () => void,
  /** callback to be called when scrolling ends */
  onScrollEnd?: (x: number, y: number) => void,
  /** the list of selected row ids */
  selectedRows?: number[],
  /** callback to be called when the currently selected rows change */
  onRowsSelect?: (selectedRows: number[]) => void,
  /** single = only one selected row at a time, multi = multiple selection, none = selection disabled */
  selectionType?: 'single' | 'multiple' | 'none',
  /** the id of the hovered row */
  hoveredRowIndex?: number,
  /** callback to be called when the hovered row changes */
  onHoverRowChange?: (rowIndex: number) => void,
  /** id of the column according which the data should be ordered */
  sortBy?: keyof T,
  /** sorting direction */
  sortDir?: TabloProps.SortDir,
  /** callback to be called when sorting change */
  onSortChange?: (x: { sortBy: keyof T, sortDir: TabloProps.SortDir }) => void,
  /** enable touch scroll */
  touchScrollEnabled?: boolean
  /** the desired width of the table. Unless autosize is false, this can be left undefined */
  width?: number,
  /** the desired height of the table.  Unless autosize is false, this can be left undefined */
  height?: number
};

export type TabloProps<T, K extends keyof T> = TabloRequiredProps<T, K> & Partial<TabloDefaultProps>;

type TabloIntrinsicProps = {
  scrollToRow?: number,
  onRowClick?: () => void,
  onColumnResizeEndCallback?: () => void,
  isColumnResizing?: boolean
};
type TabloDefaultedIntrinsicProps<T, K extends keyof T> = TabloRequiredProps<T, K> & TabloDefaultProps & TabloIntrinsicProps;

const { maybe } = t;
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
export default class Tablo<T, K extends keyof T> extends React.PureComponent<TabloProps<T, K>> {
  static defaultProps: TabloDefaultProps = {
    rowClassNameGetter: () => '',
    rowHeight: 30,
    headerHeight: 40,
    groupHeaderHeight: 50,
    footerHeight: 0,
    autosize: true
  }

  render() {
    const { data, children, rowClassNameGetter: rcnGetter, className, ..._tableProps } = this.props as TabloDefaultedIntrinsicProps<T, K>;

    const columnsOrGroups = updateColumns(children || defaultColumns(data), ({ col }: { col: React.ReactElement<ColumnProps<T, K>> }) => {
      return <Column {...{ key: col.props.name, ...col.props, data }} />;
    }).map((ch, key) => (ch.type as React.SFC<ColumnProps<T, K> | ColumnGroupProps<T>>)({ key, ...ch.props }));

    t.assert(
      columnsOrGroups.length === ([] as any[]).concat(children || Object.keys(data[0])).length,
      'There are extraneous children in the Grid. One should use only Column or ColumnGroup'
    );

    const rowClassNameGetter = (index: number) => {
      return cx('tablo-row', { 'tablo-row-even': index % 2 === 0, 'tablo-row-odd': index % 2 === 1 }, rcnGetter(index));
    };

    const rowsCount = data.length;
    const tableProps: TableProps = {
      ...omit(_tableProps, 'columnsOrder'),
      rowsCount,
      rowClassNameGetter
    };

    return (
      <FlexView column grow className={cx('tablo', className)}>
        <Table {...tableProps}>
          {columnsOrGroups}
        </Table>
      </FlexView>
    );
  }
}
