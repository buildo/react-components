# Table

## A table component based on fixed-data-table

|Name|Type|Default|Description|
|----|----|-------|-----------|
| height | Number | 0 | the desired height of the table |
| width | Number | 0 | the desired width of the table |
| autoSize | Boolean | "" | if true, the table will fit the container if width and height |
| autoSizeColumns | Boolean | "" | if true, the columns will split evenly the width, avoiding horizontal scrollbars |
| rowHeight | Number | "" | height in pixel of every row |
| headerHeight | Number | "" | height in pixel of header |
| groupHeaderHeight | Number | "" | height in pixel of groupHeader |
| footerHeight | Number | "" | height in pixel of footer |
| rowGetter | Function | "" | method to get the desired row of data |
| rowsCount | Number | "" | number of row displayed in the table |
| cellRenderer | Function | "" | method to render cells |
| children | ReactChildren | "" | content |
| sort | Struct{by: ?String, dir: ?sortDir} | "" | the desired sorting field and direction |
| selectedColumns | Array<String> | [] | selected columns |
| selectedRows | Array<Number> | [] | selected rows |
| onRowSelect | Function | "" | called when a row is selected |
| onRowsSelect | Function | "" | called when multiple rows are selected |
| selectionType | ["none","single","multi"] | "" | none - sigle - multi |
| onColumnResizeEndCallback | Function | "" | called after a column has been resized |
| isColumnResizing | Boolean | false | whether a column is currently being resized |
| columns | Array<Object> | "" | list of columns |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |
| id | String | "" | custom `id` for wrapper element |