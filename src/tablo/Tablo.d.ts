import * as React from 'react';

export namespace Tablo {
  type HeaderProps = {
    children: any
  };

  type FooterProps = {
    children: any
  }

  type ColumnGroupProps = {
    fixed?: boolean,
    children?: any
  };

  type CellProps<Data> = {
    children?: any | ((data: any , rowData: Data, rowIndex: number) => JSX.Element),
    backgroundColor?: React.CSSProperties['backgroundColor'],
    color?: React.CSSProperties['color'],
    vAlignContent?: 'top' | 'center' | 'bottom',
    hAlignContent?: 'left' | 'center' | 'right',
    contentStyle?: React.CSSProperties,
    style?: React.CSSProperties
  };

  type ColumnProps<Column> = {
    name: Column,
    width?: number,
    fixed?: boolean,
    isResizable?: boolean,
    flexGrow?: number,
    children?: any, // TODO(typo) it should be (Header | Cell | Footer)[],
    allowCellsRecycling?: boolean
  };

  type SelectedRows = number[];
  type SortBy<Column> = Column;
  type SortDir = 'asc' | 'desc';

}


export type TabloProps<Data, Column> = {
  data: Data[],
  className?: string,
  rowHeight?: number,
  headerHeight?: number,
  groupHeaderHeight?: number,
  footerHeight?: number,
  onRowMouseEnter?: (rowIndex: number) => void,
  onRowMouseLeave?: (rowIndex: number) => void,
  columnsOrder?: Column[],
  onColumnsReorder?: (columns: Column[]) => void,
  onColumnResize?: (x: { width: number, key: Column}) => void,
  children?: any, // TODO here should be Column[] | ColumnGroup[],
  scrollLeft?: number,
  scrollTop?: number,
  onScrollStart?: () => void,
  onScrollEnd?: (x: number, y: number) => void,
  selectedRows?: Tablo.SelectedRows,
  onRowsSelect?: (selectedRows: Tablo.SelectedRows) => void,
  selectionType?: 'single' | 'multiple' | 'none',
  hoveredRowIndex?: number,
  onHoverRowChange?: (rowIndex: number) => void,
  sortBy?: Tablo.SortBy<Column>,
  sortDir?: Tablo.SortDir,
  onSortChange?: (x: { sortBy: Tablo.SortBy<Column>, sortDir: Tablo.SortDir }) => void,
  rowClassNameGetter?: (rowIndex: number) => string | number | undefined | null,
  touchScrollEnabled?: boolean
} & ({
  width: number,
  height: number,
  autosize: false
} | {
  width?: undefined,
  height?: undefined,
  autosize?: true
});

export const Header: React.StatelessComponent<Tablo.HeaderProps>;
export const Footer: React.StatelessComponent<Tablo.FooterProps>;
export const Cell: React.StatelessComponent<Tablo.CellProps<any>>;
export const ColumnGroup: React.StatelessComponent<Tablo.ColumnGroupProps>;
export const Column: React.StatelessComponent<Tablo.ColumnProps<string>>
declare const Tablo: React.ComponentClass<TabloProps<any, string>>;
export default Tablo;
