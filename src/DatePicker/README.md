# DatePicker

A decent and pretty date picker to be used with React

## Props

| Name                 | Type                                                     | Default            | Description                                                                                                                            |
| -------------------- | -------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **id**               | <code>String</code>                                      |                    | _optional_. Id                                                                                                                         |
| **value**            | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. Current date                                                                                                               |
| **defaultValue**     | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. Default date                                                                                                               |
| **onChange**         | <code>Function</code>                                    |                    | _optional_. Called when value changes                                                                                                  |
| **onHide**           | <code>Function</code>                                    |                    | _optional_. Called when datepicker is closed                                                                                           |
| **returnFormat**     | <code>String</code>                                      |                    | _optional_. MomentJS format used to format date before returing through "onChange"                                                     |
| **displayFormat**    | <code>String</code>                                      |                    | _optional_. MomentJS format used to display current date                                                                               |
| **onClear**          | <code>Function</code>                                    |                    | _optional_. Called when value is cleared                                                                                               |
| **minDate**          | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. Minimum date selectable by the user                                                                                        |
| **maxDate**          | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. Maximum date selectable by the user                                                                                        |
| **fromDate**         | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. If set, the datepicker will highlight days in the range starting from this date and ending to the hovered or selected date |
| **toDate**           | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. -if set, the datepicker will highlight days in the range starting from the hovered or selected date to this value          |
| **displayTwoMonths** | <code>Boolean</code>                                     | <code>false</code> | _optional_. Set to true to display two month                                                                                           |
| **small**            | <code>Boolean</code>                                     | <code>false</code> | _optional_. Whether it's small or not                                                                                                  |
| **startDate**        | <code>union(String &#124; Date &#124; MomentDate)</code> |                    | _optional_. Specify an initial "visible" date with no need to select a defaultValue                                                    |
| **locale**           | <code>String</code>                                      |                    | _optional_. Locale used for translations                                                                                               |
| **disabled**         | <code>Boolean</code>                                     | <code>false</code> | _optional_. Whether the datepicker should be disabled or not                                                                           |
| **className**        | <code>String</code>                                      |                    | _optional_. Additional `className` for wrapper element                                                                                 |
| **style**            | <code>Object</code>                                      |                    | _optional_. Inline-style overrides for wrapper element                                                                                 |
