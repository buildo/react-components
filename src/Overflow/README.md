# Overflow

Util component to render a different react node if the original one overflows its parent.

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **content** | <code>ReactNode</code> |  | **required**. React node initially rendered |
| **contentIfOverflowing** | <code>ReactNode</code> |  | **required**. React node rendered if `content` overflows its parent |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |