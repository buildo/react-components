declare module 'fixed-data-table-2' {
  import {
    Table as FDTTable,
    Column as FDTColumn,
    ColumnGroup as FDTColumnGroup,
    Cell as FDTCell,
    CellProps as FDTCellProps
  } from 'fixed-data-table';

  export class Table extends FDTTable {}
  export class Column extends FDTColumn {}
  export class ColumnGroup extends FDTColumnGroup {}
  export class Cell extends FDTCell {}

  export { FDTCellProps };
}


