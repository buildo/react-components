# FocusableView

## A panel that can get focus

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | Function | "" | FocusableView content. If a function it gets called with the boolean "focused". |
| onFocus | Function | "onFocus" | Callback function called on "focus" event |
| onBlur | Function | "onBlur" | Callback function called on "blur" event |
| tabIndex | Number | 0 | "tabindex" attribute |
| component | Function | String | "div" | Wrapper component for `children` |
| ignoreFocus | Boolean | "" | When `true` the class "focused" is NOT added |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |