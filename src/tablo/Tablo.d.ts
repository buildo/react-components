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

export type CellProps = {
  children?: any | ((data: any, rowData: any, rowIndex: number) => JSX.Element),
  backgroundColor?: React.CSSProperties['backgroundColor'],
  color?: React.CSSProperties['color'],
  vAlignContent?: 'top' | 'center' | 'bottom',
  hAlignContent?: 'left' | 'center' | 'right',
  contentStyle?: React.CSSProperties,
  style?: React.CSSProperties
};

export type ColumnProps = {
  name: string,
  width?: number,
  fixed?: boolean,
  isResizable?: boolean,
  flexGrow?: number,
  children?: any, // TODO(typo) it should be (Header | Cell | Footer)[],
  allowCellsRecycling?: boolean
};

type SelectedRows = string[];
type SortBy = string;
type SortDir = 'asc' | 'desc';

export type TabloProps = {
  data: any[],
  className?: string,
  rowHeight?: number,
  headerHeight?: number,
  groupHeaderHeight?: number,
  footerHeight?: number,
  onRowMouseEnter?: (rowIndex: number) => void,
  onRowMouseLeave?: (rowIndex: number) => void,
  columnsOrder?: string[],
  onColumnsReorder?: (columns: string[]) => void,
  onColumnResize?: (x: { width: number, key: string}) => void,
  children?: any, // TODO here should be Column[] | ColumnGroup[],
  scrollLeft?: number,
  scrollTop?: number,
  onScrollStart?: () => void,
  onScrollEnd?: (x: number, y: number) => void,
  selectedRows?: number[],
  onRowsSelect?: (selectedRows: number[]) => void,
  selectionType?: 'single' | 'multiple' | 'none',
  hoveredRowIndex?: number,
  onHoverRowChange?: (rowIndex: number) => void,
  sortBy?: SortBy,
  sortDir?: SortDir,
  onSortChange?: (x: { sortBy: SortBy, sortDir: SortDir }) => void,
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
export const Cell: React.StatelessComponent<CellProps>;
export const ColumnGroup: React.StatelessComponent<ColumnGroupProps>;
export const Column: React.StatelessComponent<ColumnProps>;
export default class Tablo extends React.PureComponent<TabloProps> {}

