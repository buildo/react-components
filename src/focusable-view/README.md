# FocusableView

## A panel that can get focus

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>union(ReactChildren&#124;Function)</code> |  | **required**. FocusableView content. If a function it gets called with the boolean "focused". |
| **onFocus** | <code>Function</code> | <code>"onFocus"</code> | *optional*. Callback function called on "focus" event |
| **onBlur** | <code>Function</code> | <code>"onBlur"</code> | *optional*. Callback function called on "blur" event |
| **tabIndex** | <code>Number</code> | <code>0</code> | *optional*. "tabindex" attribute |
| **component** | <code>union(Function&#124;String)</code> | <code>"div"</code> | *optional*. Wrapper component for `children` |
| **ignoreFocus** | <code>Boolean</code> |  | *optional*. When `true` the class "focused" is NOT added |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |