# CollapsableSection

## A collapsable panel, allowing you to toggle more/less content

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | panel content (visible only when expanded) |
| isOpen | Boolean | "" | true if panel is expanded |
| isSelected | Boolean | "" | true if panel has focus |
| onChange | Function | "" | called when panel is toggled |
| onOpen | Function | "onOpen" | called when panel is expanded |
| onClose | Function | "onClose" | called when panel is collapsed |
| header | ReactChild | "" | header content (the only visible part when panel is collapsed) |
| icons | Struct{open: ?String, closed: ?String} | "" | icons for open/closed panel |
| className | String | "" | additional `className` for wrapper element |
| id | String | "" | custom `id` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |