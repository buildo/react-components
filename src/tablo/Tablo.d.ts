import * as React from 'react';

export type HeaderProps = {
  children: any
};

export type FooterProps = {
  children: any
}

export type ColumnGroupProps = {
  fixed?: boolean,
  children?: any // TODO(typo) it should be Columns[]
};

export type CellProps<Data> = {
  children?: any | ((data: any , rowData: Data, rowIndex: number) => JSX.Element),
  backgroundColor?: React.CSSProperties['backgroundColor'],
  color?: React.CSSProperties['color'],
  vAlignContent?: 'top' | 'center' | 'bottom',
  hAlignContent?: 'left' | 'center' | 'right',
  contentStyle?: React.CSSProperties,
  style?: React.CSSProperties
};

export type ColumnProps<Columns> = {
  name: Columns,
  width?: number,
  fixed?: boolean,
  isResizable?: boolean,
  flexGrow?: number,
  children?: any, // TODO(typo) it should be (Header | Cell | Footer)[],
  allowCellsRecycling?: boolean
};

type SelectedRows = number[];
type SortBy<Columns> = Columns;
type SortDir = 'asc' | 'desc';

export type TabloProps<Data, Columns> = {
  data: Data[],
  className?: string,
  rowHeight?: number,
  headerHeight?: number,
  groupHeaderHeight?: number,
  footerHeight?: number,
  onRowMouseEnter?: (rowIndex: number) => void,
  onRowMouseLeave?: (rowIndex: number) => void,
  columnsOrder?: Columns[],
  onColumnsReorder?: (columns: string[]) => void,
  onColumnResize?: (x: { width: number, key: string}) => void,
  children?: any, // TODO here should be Column[] | ColumnGroup[],
  scrollLeft?: number,
  scrollTop?: number,
  onScrollStart?: () => void,
  onScrollEnd?: (x: number, y: number) => void,
  selectedRows?: SelectedRows,
  onRowsSelect?: (selectedRows: SelectedRows) => void,
  selectionType?: 'single' | 'multiple' | 'none',
  hoveredRowIndex?: number,
  onHoverRowChange?: (rowIndex: number) => void,
  sortBy?: SortBy<Columns>,
  sortDir?: SortDir,
  onSortChange?: (x: { sortBy: SortBy<Columns>, sortDir: SortDir }) => void,
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

export const Header: React.StatelessComponent<HeaderProps>;
export const Footer: React.StatelessComponent<FooterProps>;
export const Cell: React.StatelessComponent<CellProps<any>>;
export const ColumnGroup: React.StatelessComponent<ColumnGroupProps>;
export const Column: React.StatelessComponent<ColumnProps<string>>
declare const Tablo: React.ComponentClass<TabloProps<any, string>>;
export default Tablo;
