# Toggle

A nice animated Toggle rendered using only CSS

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **value** | <code>Boolean</code> |  | *optional*. The current value (`true` if checked) |
| **onChange** | <code>Function</code> |  | *optional*. Callback called when user clicks on the Toggle |
| **valueLink** | <code>Struct{value: ?Boolean, requestChange: Function}</code> |  | *optional*. To be used together with `linkState` |
| **size** | <code>union(String &#124; Number)</code> |  | *optional*. The size for the Toggle in whatever unit (px, em, rem ...). It will be used to compute `width`, `height` and `border-radius` as follows: `width: size`, `height: size / 2`, `border-radius: size / 2` |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |