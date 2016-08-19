# ConfirmationInput

## An input field that allows to confirm its content

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **initialValue** | <code>String</code> |  | *optional*. Initial value |
| **onChange** | <code>Function</code> | <code>"onChange"</code> | *optional*. Called when input box content is changed |
| **onConfirm** | <code>Function</code> | <code>"onConfirm"</code> | *optional*. Called when confirming input content |
| **onClear** | <code>Function</code> | <code>"onClear"</code> | *optional*. Called when clearing confirmed content |
| **placeholder** | <code>String</code> |  | *optional*. Input placeholder |
| **disabled** | <code>Boolean</code> |  | *optional*. True if disabled |
| **text** | <code>Struct{clear: ?String, toConfirm: ?String}</code> |  | **required**. Labels for 'clear' and 'toConfirm' buttons |
| **icon** | <code>Struct{clear: ?String, toConfirm: ?String}</code> |  | **required**. Icons for 'clear' and 'toConfirm' buttons |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |