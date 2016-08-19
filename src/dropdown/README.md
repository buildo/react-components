# Dropdown

## A dropdown field

|Name|Type|Default|Description|
|----|----|-------|-----------|
| value | Number | String | Object | Array<Object> | "" | selected value |
| valueLink | Struct{value: ?Number | String | Object | Array<Object>, requestChange: Function} | "" | defines actions to be taken when a particular value is selected |
| onChange | Function | "" | called when value is changed |
| options | Array<Object> | "" | available options |
| size | ["medium","small"] | "medium" | medium - small |
| disabled | Boolean | false | true if disabled |
| searchable | Boolean | false | true if it should be possible to search the desired value by writing into the dropdown |
| clearable | Boolean | false | true if it should be possible to reset the selected value |
| backspaceRemoves | Boolean | "" | whether pressing backspace removes the last item when there is no input value |
| multi | Boolean | false | true if it should be possible to select multiple values |
| flat | Boolean | false | whether it should have a flat style |
| id | String | "" | custom `id` for wrapper element |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |