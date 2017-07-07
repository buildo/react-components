# NewDatePicker

A decent and pretty date picker to be used with React

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **id** | <code>String</code> |  | *optional*. Id |
| **value** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Current date |
| **onChange** | <code>Function</code> |  | *optional*. Called when value changes |
| **returnFormat** | <code>String</code> |  | *optional*. MomentJS format used to format date before returing through "onChange" |
| **disabled** | <code>Boolean</code> | <code>false</code> | *optional*. Whether the datepicker should be disabled or not |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |