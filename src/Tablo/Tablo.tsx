import * as React from "react";
import * as cx from "classnames";
import { Table, TableProps } from "fixed-data-table-2";
import Column, { defaultColumns, updateColumns } from "./Column";
import FlexView from "react-flexview";
import ColumnGroup from "./ColumnGroup";
import {
  autosize,
  columnsResize,
  columnsReorder,
  scrollable,
  selectable,
  sortable
} from "./plugins";
import omit = require("lodash/omit");
import { warn } from "../utils/log";

import "./patch-fixed-data-table-2";

export type TabloDefaultProps = {
  /** height in pixel of every row */
  rowHeight: number;
  /** height in pixel of header */
  headerHeight: number;
  /** height in pixel of groupHeader */
  groupHeaderHeight: number;
  /** height in pixel of footer */
  footerHeight: number;
  /**  a function giving a className for a row index */
  rowClassNameGetter: (rowIndex: number) => string | number | undefined | null;
  /** wheater the table should resize to fit the available space. Default true. */
  autosize: boolean;
};

export type TabloRequiredProps<T> = {
  /** data shown in the table */
  data: T[];
  className?: string;
  /** callback to be called when mouse enters a row */
  onRowMouseEnter?: (rowIndex: number) => void;
  /** callback to be called when mouse leaves a row */
  onRowMouseLeave?: (rowIndex: number) => void;
  /** an array containing the ordered list of column names, in the same order they should be rendered */
  columnsOrder?: string[];
  /** callback to be called when the order of columns changes after dragging an header in a new position */
  onColumnsReorder?: (columns: string[]) => void;
  /** callback to be called when a column is resized */
  onColumnResize?: (x: { width: number; key: string }) => void;
  /** table children (Column or ColumnGroup) */
  children?:
    | Tablo.ColumnChild<T>
    | Tablo.ColumnChild<T>[]
    | Tablo.ColumnGroupChild<T>
    | Tablo.ColumnGroupChild<T>[];
  /** value of horizontal scroll */
  scrollLeft?: number;
  /** value of vertical scroll */
  scrollTop?: number;
  /** callback to be called when scrolling starts */
  onScrollStart?: () => void;
  /** callback to be called when scrolling ends */
  onScrollEnd?: (x: number, y: number) => void;
  /** the list of selected row ids */
  selectedRows?: number[];
  /** callback to be called when the currently selected rows change */
  onRowsSelect?: (selectedRows: number[]) => void;
  /** single = only one selected row at a time, multi = multiple selection, none = selection disabled */
  selectionType?: "single" | "multi" | "none";
  /** the id of the hovered row */
  hoveredRowIndex?: number;
  /** callback to be called when the hovered row changes */
  onHoverRowChange?: (rowIndex: number) => void;
  /** id of the column according which the data should be ordered */
  sortBy?: string;
  /** sorting direction */
  sortDir?: Tablo.SortDir;
  /** callback to be called when sorting change */
  onSortChange?: (x: Tablo.Sort<string>) => void;
  /** enable touch scroll */
  touchScrollEnabled?: boolean;
  /** the desired width of the table. Unless autosize is false, this can be left undefined */
  width?: number;
  /** the desired height of the table.  Unless autosize is false, this can be left undefined */
  height?: number;
};

export type TabloIntrinsicProps = {
  scrollToRow?: number;
  onRowClick?: (event: React.SyntheticEvent<Table>, rowIndex: number) => void;
  onColumnResizeEndCallback?: () => void;
  isColumnResizing?: boolean;
};
export type TabloDefaultedIntrinsicProps<T> = TabloRequiredProps<T> &
  TabloDefaultProps &
  TabloIntrinsicProps;

export namespace Tablo {
  export type SortDir = "asc" | "desc";
  export type Sort<K> = {
    sortBy?: K;
    sortDir?: SortDir;
  };
  export type ColumnChild<T> = React.ReactElement<Column.Props<T>>;
  export type ColumnGroupChild<T> = React.ReactElement<ColumnGroup.Props<T>>;

  export type Props<T extends {}> = TabloRequiredProps<T> &
    Partial<TabloDefaultProps>;
}

class TabloComponent<T extends {}> extends React.PureComponent<Tablo.Props<T>> {
  static defaultProps: TabloDefaultProps = {
    rowClassNameGetter: () => "",
    rowHeight: 30,
    headerHeight: 40,
    groupHeaderHeight: 50,
    footerHeight: 0,
    autosize: true
  };

  render() {
    const {
      data,
      children,
      rowClassNameGetter: rcnGetter,
      className,
      ..._tableProps
    } = this.props as TabloDefaultedIntrinsicProps<T>;

    const columnsOrGroups = updateColumns(
      children || defaultColumns(data),
      ({ col }: { col: Tablo.ColumnChild<T> }) => {
        return (
          <Column {...{ key: col.props.name as any, ...col.props, data }} />
        );
      }
    ).map((ch, key) => (ch.type as React.SFC<any>)({ key, ...ch.props }));

    if (
      columnsOrGroups.length !==
      ([] as any[]).concat(children || Object.keys(data[0])).length
    ) {
      warn(
        "There are extraneous children in the Grid. One should use only Column or ColumnGroup"
      );
    }

    const rowClassNameGetter = (index: number) => {
      return cx(
        "tablo-row",
        { "tablo-row-even": index % 2 === 0, "tablo-row-odd": index % 2 === 1 },
        rcnGetter(index)
      );
    };

    const rowsCount = data.length;
    const tableProps: TableProps = {
      ...omit(_tableProps, ["columnsOrder", "autosize"]),
      rowsCount,
      rowClassNameGetter
    } as TableProps;

    return (
      <FlexView column grow className={cx("tablo", className)}>
        <Table {...tableProps}>{columnsOrGroups}</Table>
      </FlexView>
    );
  }
}

const _Component = autosize(
  columnsResize(
    columnsReorder(scrollable(selectable(sortable(TabloComponent as any))))
  )
);

export function Tablo<T extends {}>(
  props: Tablo.Props<T>
): React.ReactElement<Tablo.Props<T>> {
  const Component = (_Component as any) as React.ComponentClass<Tablo.Props<T>>;
  return <Component {...props} />;
}
