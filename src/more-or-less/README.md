# MoreOrLess

## A panel used to alternately display short or long version of the content

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | panel content |
| expanded | Boolean | "" | whether the panel should be expanded or not |
| onExpandedChange | Function | "" | called on toggle |
| icons | Struct{expanded: String, collapsed: String} | "" | icons for expanded and collapsed panel |
| wrapperProps | Object | "" | props for wrapper FlexView |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |