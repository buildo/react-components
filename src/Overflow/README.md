# Overflow

Util component which accepts calls a callback whenever the content starts or stop overflowing.

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. A function that will be called with the argument |
| **onChange** | <code>Function</code> |  | **required**. Tooltip delay if the component is lazy |
| **verifyOverflowOn** | <code>enum("resize" &#124; "hover")</code> | <code>"resize"</code> | *optional*. Check if the content is overflowing on one of the following events: "resize" &#124; "hover" |
| **debounceVerifyOverflow** | <code>Number</code> |  | *optional*. Use this to debounce the calls to verify if the content is overflowing |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |