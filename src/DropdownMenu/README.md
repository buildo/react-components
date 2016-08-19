# DropdownMenu

## A toggleable dropdown menu

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | menu button content |
| menuRenderer | Function | "" | renderer for menu items |
| options | Array<optionType> | "" | menu options |
| iconClassName | String | "" | className for menu button icon (if children is passed, this is ignored) |
| isOpen | Boolean | false | whether the menu is open or not |
| onOpen | Function | "" | called when menu is open |
| onClose | Function | "" | called when menu is closed |
| dismissOnClickOut | Boolean | true | whether the menu should be closed when clicking outside the dropdown |
| size | ["small","medium","large"] | "" | small - medium - large |
| maxHeight | Number | "" | menu button max-height |
| className | String | "" | additional `className` for wrapper element |