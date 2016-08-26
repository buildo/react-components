# Table

A table component based on fixed-data-table

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **height** | <code>Number</code> | <code>0</code> | *optional*. The desired height of the table |
| **width** | <code>Number</code> | <code>0</code> | *optional*. The desired width of the table |
| **autoSize** | <code>Boolean</code> |  | *optional*. If true, the table will fit the container if width and height |
| **autoSizeColumns** | <code>Boolean</code> |  | *optional*. If true, the columns will split evenly the width, avoiding horizontal scrollbars |
| **rowHeight** | <code>Number</code> |  | *optional*. Height in pixel of every row |
| **headerHeight** | <code>Number</code> |  | *optional*. Height in pixel of header |
| **groupHeaderHeight** | <code>Number</code> |  | *optional*. Height in pixel of groupHeader |
| **footerHeight** | <code>Number</code> |  | *optional*. Height in pixel of footer |
| **rowGetter** | <code>Function</code> |  | **required**. Method to get the desired row of data |
| **rowsCount** | <code>Number</code> |  | *optional*. Number of row displayed in the table |
| **cellRenderer** | <code>Function</code> |  | **required**. Method to render cells |
| **children** | <code>ReactChildren</code> |  | **required**. Content |
| **sort** | <code>Struct{by: ?String, dir: ?sortDir}</code> |  | *optional*. The desired sorting field and direction |
| **selectedColumns** | <code>Array<String></code> | <code>[]</code> | *optional*. Selected columns |
| **selectedRows** | <code>Array<Number></code> | <code>[]</code> | *optional*. Selected rows |
| **onRowSelect** | <code>Function</code> |  | *optional*. Called when a row is selected |
| **onRowsSelect** | <code>Function</code> |  | *optional*. Called when multiple rows are selected |
| **selectionType** | <code>enum("none" &#124; "single" &#124; "multi")</code> |  | **required**. None &#124; sigle &#124; multi |
| **onColumnResizeEndCallback** | <code>Function</code> |  | *optional*. Called after a column has been resized |
| **isColumnResizing** | <code>Boolean</code> | <code>false</code> | *optional*. Whether a column is currently being resized |
| **columns** | <code>Array<Object></code> |  | *optional*. List of columns |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |