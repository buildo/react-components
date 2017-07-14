# CollapsableSection

A collapsable panel, allowing you to toggle more/less content

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. Panel content (visible only when expanded) |
| **isOpen** | <code>Boolean</code> |  | **required**. True if panel is expanded |
| **isSelected** | <code>Boolean</code> |  | *optional*. True if panel has focus |
| **onChange** | <code>Function</code> |  | **required**. Called when panel is toggled |
| **onOpen** | <code>Function</code> | <code>"onOpen"</code> | *optional*. Called when panel is expanded |
| **onClose** | <code>Function</code> | <code>"onClose"</code> | *optional*. Called when panel is collapsed |
| **header** | <code>ReactChild</code> |  | *optional*. Header content (the only visible part when panel is collapsed) |
| **icons** | <code>Struct{open: ?String, closed: ?String}</code> |  | *optional*. Icons for open/closed panel |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |