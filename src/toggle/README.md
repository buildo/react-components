# Toggle

## A nice animated Toggle rendered using only CSS

|Name|Type|Default|Description|
|----|----|-------|-----------|
| value | Boolean | "" | the current value (`true` if checked) |
| onChange | Function | "" | callback called when user clicks on the Toggle |
| valueLink | Struct{value: ?Boolean, requestChange: Function} | "" | to be used together with `linkState` |
| size | String | Number | "" | The size for the Toggle in whatever unit (px, em, rem ...). It will be used to compute `width`, `height` and `border-radius` as follows: `width: size`, `height: size / 2`, `border-radius: size / 2` |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |