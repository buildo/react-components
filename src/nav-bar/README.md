# NavBar

## A NavBar container built with FlexView:
- easy positioning of content (left, center and right columns)
- lets you define basic css style from JS

|Name|Type|Default|Description|
|----|----|-------|-----------|
| content | Struct{left: ?ReactChildren, center: ?ReactChildren, right: ?ReactChildren, maxWidth: ?String | Number} | "" | props used to define the NavBar content (defines left, center, right, maxWidth). |
| fixed | Boolean | "" | to set `position: fixed` |
| height | String | Number | "" | shorthand for css `height` |
| background | String | "" | shorthand for css `background` |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |