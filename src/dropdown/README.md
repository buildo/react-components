# Dropdown

A dropdown field based on [react-select](https://github.com/JedWatson/react-select)

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **value** | <code>union(Number &#124; String &#124; Object &#124; Array<Object>)</code> |  | *optional*. Selected value |
| **valueLink** | <code>Struct{value: ?Number &#124; String &#124; Object &#124; Array<Object>, requestChange: Function}</code> |  | *optional*. Defines actions to be taken when a particular value is selected |
| **onChange** | <code>Function</code> |  | *optional*. Called when value is changed |
| **options** | <code>Array<Object></code> |  | **required**. Available options |
| **size** | <code>enum("medium" &#124; "small")</code> | <code>"medium"</code> | **required**. Medium &#124; small |
| **disabled** | <code>Boolean</code> | <code>false</code> | *optional*. True if disabled |
| **searchable** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should be possible to search the desired value by writing into the dropdown |
| **clearable** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should be possible to reset the selected value |
| **backspaceRemoves** | <code>Boolean</code> |  | *optional*. Whether pressing backspace removes the last item when there is no input value |
| **multi** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should be possible to select multiple values |
| **flat** | <code>Boolean</code> | <code>false</code> | *optional*. Whether it should have a flat style |
| **autoBlur** | <code>Boolean</code> | <code>true</code> | *optional*. Whether it should blur automatically when the user selects a value |
| **simpleValue** | <code>Boolean</code> | <code>true</code> | *optional*. If true, selected values will be passed to onChange as comma-separated string of values (eg "1,2,3") instead of array of objects |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |
| **menuRenderer** | <code>Function</code> |  | *optional*. The function that can be used to override the default drop-down list of options |
| **groupByKey** | <code>String</code> | <code>"optionGroup"</code> | *optional*. The field name to group by |
| **optionGroupRenderer** | <code>Function</code> | <code>"defaultOptionGroupRenderer"</code> | *optional*. The function that gets used to render the content of an option group |