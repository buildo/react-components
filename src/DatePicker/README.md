# DatePicker

A decent and pretty date picker to be used with React

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **id** | <code>String</code> |  | *optional*. Id |
| **value** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Current date |
| **defaultValue** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Default date |
| **onChange** | <code>Function</code> |  | *optional*. Called when value changes |
| **onHide** | <code>Function</code> |  | *optional*. Called when datepicker is closed |
| **returnFormat** | <code>String</code> |  | *optional*. MomentJS format used to format date before returing through "onChange" |
| **displayFormat** | <code>String</code> |  | *optional*. MomentJS format used to display current date |
| **onClear** | <code>Function</code> |  | *optional*. Called when value is cleared |
| **minDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Minimum date selectable by the user |
| **maxDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Maximum date selectable by the user |
| **fromDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. If set, the datepicker will highlight days in the range starting from this date and ending to the hovered or selected date |
| **toDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. -if set, the datepicker will highlight days in the range starting from the hovered or selected date to this value |
| **displayTwoMonths** | <code>Boolean</code> | <code>false</code> | *optional*. Set to true to display two month |
| **small** | <code>Boolean</code> | <code>false</code> | *optional*. Whether it's small or not |
| **startDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Specify an initial "visible" date with no need to select a defaultValue |
| **locale** | <code>String</code> |  | *optional*. Locale used for translations |
| **disabled** | <code>Boolean</code> | <code>false</code> | *optional*. Whether the datepicker should be disabled or not |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |