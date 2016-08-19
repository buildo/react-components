# TextOverflow

## Text view which, if string content is too large, trims it and shows the full content on "hover" with a `Popover` (or custom component if any)

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | Function | "" | in case you want to use a custom component (like a `Tooltip`) to render the full content which is passed as the first argument |
| label | String | "" | this is the full string |
| lazy | Boolean | "" | whether the tooltip appearance should be delayed after mouse entering or not |
| delayWhenLazy | Integer | 100 | tooltip delay if the component is lazy |
| id | String | "" | custom `id` for wrapper element |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |