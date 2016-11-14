# Tablo

A table component based on fixed-data-table-2

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **data** | <code>Array</code> |  | **required**. Data shown in the table |
| **defaultColumns** | <code>Function</code> | <code>"defaultColumns"</code> | *optional*. A function that returns the default columns given the data |
| **width** | <code>Number</code> | <code>500</code> | **required**. The desired width of the table |
| **height** | <code>Number</code> | <code>500</code> | **required**. The desired height of the table |
| **rowHeight** | <code>Number</code> | <code>30</code> | **required**. Height in pixel of every row |
| **headerHeight** | <code>Number</code> | <code>40</code> | **required**. Height in pixel of header |
| **groupHeaderHeight** | <code>Number</code> | <code>50</code> | **required**. Height in pixel of groupHeader |
| **footerHeight** | <code>Number</code> | <code>0</code> | **required**. Height in pixel of footer |
| **onRowMouseEnter** | <code>Function</code> |  | *optional*. Callback to be called when mouse enters a row |
| **onRowMouseLeave** | <code>Function</code> |  | *optional*. Callback to be called when mouse leaves a row |
| **scrollLeft** | <code>Integer</code> |  | *optional*. Value of horizontal scroll |
| **scrollTop** | <code>Integer</code> |  | *optional*. Value of vertical scroll |
| **onScrollStart** | <code>Function</code> |  | *optional*. Callback to be called when scrolling starts |
| **onScrollEnd** | <code>Function</code> |  | *optional*. Callback to be called when scrolling ends |
| **children** | <code>ReactChildren</code> |  | **required**. Table children (Column or ColumnGroup) |
| **scrollToRow** | <code>Integer</code> |  | *optional*. Index of the row to scroll to |
| **onRowClick** | <code>Function</code> |  | *optional*. Callback to be called when a row is clicked |
| **rowClassNameGetter** | <code>Function</code> |  | *optional*. Called to get any additional CSS classes that should be added to a row |
| **onColumnResizeEndCallback** | <code>Function</code> |  | *optional*. Callback to be called when resizer has been released and column needs to be updated |
| **isColumnResizing** | <code>Boolean</code> |  | *optional*. Whether a column is currently being resized |