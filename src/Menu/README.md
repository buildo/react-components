# DropdownMenu

A toggleable dropdown menu

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | *optional*. Menu button content |
| **menuRenderer** | <code>Function</code> |  | *optional*. Renderer for menu items |
| **options** | <code>Array<optionType></code> |  | **required**. Menu options |
| **iconClassName** | <code>String</code> |  | *optional*. ClassName for menu button icon (if children is passed, this is ignored) |
| **isOpen** | <code>Boolean</code> | <code>false</code> | *optional*. Whether the menu is open or not |
| **onOpen** | <code>Function</code> |  | **required**. Called when menu is open |
| **onClose** | <code>Function</code> |  | **required**. Called when menu is closed |
| **dismissOnClickOut** | <code>Boolean</code> | <code>true</code> | *optional*. Whether the menu should be closed when clicking outside the dropdown |
| **size** | <code>enum("small" &#124; "medium" &#124; "large")</code> |  | *optional*. Small &#124; medium &#124; large |
| **maxHeight** | <code>Number</code> |  | *optional*. Menu button max-height |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |