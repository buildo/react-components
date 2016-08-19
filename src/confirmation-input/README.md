# ConfirmationInput

## An input field that allows to confirm its content

|Name|Type|Default|Description|
|----|----|-------|-----------|
| initialValue | String | "" | initial value |
| onChange | Function | "onChange" | called when input box content is changed |
| onConfirm | Function | "onConfirm" | called when confirming input content |
| onClear | Function | "onClear" | called when clearing confirmed content |
| placeholder | String | "" | input placeholder |
| disabled | Boolean | "" | true if disabled |
| text | Struct{clear: ?String, toConfirm: ?String} | "" | labels for 'clear' and 'toConfirm' buttons |
| icon | Struct{clear: ?String, toConfirm: ?String} | "" | icons for 'clear' and 'toConfirm' buttons |
| className | String | "" | additional `className` for wrapper element |
| id | String | "" | custom `id` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |