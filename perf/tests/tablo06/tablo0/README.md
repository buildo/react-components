# Tablo

A table component based on fixed-data-table-2

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **data** | <code>Array</code> |  | **required**. Data shown in the table |
| **width** | <code>Number</code> |  | **required**. The desired width of the table. Unless autosize is false, this can be left undefined |
| **height** | <code>Number</code> |  | **required**. The desired height of the table.  Unless autosize is false, this can be left undefined |
| **rowHeight** | <code>Number</code> | <code>30</code> | *optional*. Height in pixel of every row |
| **headerHeight** | <code>Number</code> | <code>40</code> | *optional*. Height in pixel of header |
| **groupHeaderHeight** | <code>Number</code> | <code>50</code> | *optional*. Height in pixel of groupHeader |
| **footerHeight** | <code>Number</code> | <code>0</code> | *optional*. Height in pixel of footer |
| **onRowMouseEnter** | <code>Function</code> |  | *optional*. Callback to be called when mouse enters a row |
| **onRowMouseLeave** | <code>Function</code> |  | *optional*. Callback to be called when mouse leaves a row |
| **scrollLeft** | <code>Integer</code> |  | *optional*. Value of horizontal scroll |
| **scrollTop** | <code>Integer</code> |  | *optional*. Value of vertical scroll |
| **onScrollStart** | <code>Function</code> |  | *optional*. Callback to be called when scrolling starts |
| **onScrollEnd** | <code>Function</code> |  | *optional*. Callback to be called when scrolling ends |
| **children** | <code>ReactChildren</code> |  | **required**. Table children (Column or ColumnGroup) |
| **scrollToRow** | <code>Integer</code> |  | *optional*. Private |
| **onRowClick** | <code>Function</code> |  | *optional*. Private |
| **rowClassNameGetter** | <code>Function</code> |  | *optional*. Private |
| **onColumnResizeEndCallback** | <code>Function</code> |  | *optional*. Private |
| **isColumnResizing** | <code>Boolean</code> |  | *optional*. Private |