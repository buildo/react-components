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
| **children** | <code>ReactChildren</code> |  | **required**. Content |