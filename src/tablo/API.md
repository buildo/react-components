# Tablo

A table component based on fixed-data-table-2

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **data** | <code>Array(Object)</code> |  | **required**. Data shown in the table. It must be an array of structs of the samey types |
| **autosize** | <code>Boolean</code> | <code>true</code> | *optional*. Whether the table should fit the container sizes or not. If set to <code>false</code>, <code>width</code> and <code>height</code> must be provided
| **columnsOrder** | <code>Array(String)</code> | | *optional*. An optional reordering of the columns. An array with the columns' names must be provided. To be used together with <code>onColumnsReorder</code> to handle dynamically the reordering of the columns
| **onColumnsReorder** | <code>Function</code> | | *optional*. Callback to handle the reordering of the columns. The new <code>columnsOrder</code> is passed as parameter.
| **onColumnResize** | <code>Function</code> | | *optional*. Callback to handle the resizing of the columns. An object containing the <code>key</code> and <code>width</code> is passed as parameter
| **selectionType** | <code>multi &#124; single &#124; none</code> |  <code>none</code> | *optional*.
| **selectedRows** | <code>Array(Integer)</code> | | *optional*. List of selected rows' indexes
| **onRowsSelect** | <code>Function</code> | | *optional*. Callback to handle <code>selectedRows</code> prop. An array with the indexes of selected rows is passed as parameter
| **hoveredRowIndex** | <code>Integer</code> | | *optional*.
| **onHoveredRowChange** | <code>Function</code> | | *optional*. Callback to handle <code>hoveredRowIndex</code> prop. The <code>rowNumber</code> being hovered is passed as parameter (rowNumber will be set to <code>null</code> if no rows are hovered)
| **onSortChange** | <code>Function</code> | | *optional*. Callback to handle <code>sortBy</code> and <code>sortDir</code>props. Called when a header of a sortable column is clicked. An object containing the <code>sortBy</code> and <code>sortDir</code> strings is passed as parameter.
| **sortBy** | <code>String</code> |  | *optional*. key (name) of the field for which the table is sorted
| **sortDir** | <code>asc &#124; desc</code> |  | *optional*. Whether to show an ascending or descending icon. Required if <code>sortBy</code> is provided
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **width** | <code>Number</code> |  | *optional*. The desired width of the table. If autosize is set to false, this is **required** |
| **height** | <code>Number</code> |  | *optional*. The desired height of the table.  If autosize is set to false, this is **required** |
| **rowHeight** | <code>Number</code> | <code>30</code> | *optional*. Height in pixel of every row |
| **headerHeight** | <code>Number</code> | <code>40</code> | *optional*. Height in pixel of header |
| **groupHeaderHeight** | <code>Number</code> | <code>50</code> | *optional*. Height in pixel of groupHeader |
| **footerHeight** | <code>Number</code> | <code>0</code> | *optional*. Height in pixel of footer |
| **scrollLeft** | <code>Integer</code> |  | *optional*. Value of horizontal scroll |
| **scrollTop** | <code>Integer</code> |  | *optional*. Value of vertical scroll |
| **onScrollStart** | <code>Function</code> |  | *optional*. Callback to be called when scrolling starts |
| **onScrollEnd** | <code>Function</code> |  | *optional*. Callback to be called when scrolling ends |
| **children** | <code>ReactChildren</code> |  | *optional*. Table children (Column or ColumnGroup). If left undefined, columns will be populated automatically with data|

## Column Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **name** | <code>String</code> | | **required**. Used to retrieve the corresponding piece of data in the object
| **width** | <code>Number</code> | <code>200</code> | *optional*. The desired width of the column |
| **children** | <code>ReactChildren</code> | <div style='margin-bottom: 10px'><code>&lt;Header&gt;{this.props.name}&lt;/Header&gt;</code></div><div style='margin-bottom: 10px'><code>&lt;Cell&gt;{x => x}&lt;/Cell&gt;</code></div><div><code>&lt;Footer /&gt;</code></div> | *optional*. Column children (Header, Cell and Footer, all optional). If Header omitted, it will display <code>name</code>; if Cell is omitted, it will display the data with key <code>name</code> for the corresponding row; if Footer is omitted, its content will be empty
| **fixed** | <code>Boolean</code> | <code>true</code>| *optional*. Used to set the column to fixed, it will be pulled to the left and it will not scroll with the rest of the columns
| **sortable** | <code>Boolean</code> | <code>true</code>| *optional*. Used to exclude the columns from the sortable fields. It is default <code>true</code> if the `onSortChange` callback is provided to the Tablo component
| **isResizable** | <code>Boolean</code> | <code>true</code>| *optional*. Used to make the column's width not modifiable. It is default <code>true</code> if the `onColumnResize` callback is provided to the Tablo component
| **allowCellsRecycling** | <code>Boolean</code> | <code>true</code>| *optional*. Used to enable horizontal virtualization for the cells of this column
