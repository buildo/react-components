# TextOverflow

Text view which, if string content is too large, trims it and shows the full content on "hover".

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>Function</code> |  | *optional*. In case you want to use a custom component (like a `Tooltip`) to render the full content which is passed as the first argument |
| **label** | <code>String</code> |  | **required**. This is the full string |
| **lazy** | <code>Boolean</code> |  | *optional*. Whether the tooltip appearance should be delayed after mouse entering or not |
| **delayWhenLazy** | <code>Integer</code> | <code>100</code> | *optional*. Tooltip delay if the component is lazy |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |