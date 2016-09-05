# Panel

A simple component used to group elements in a box.

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **type** | <code>enum("docked-top" &#124; "docked-left" &#124; "docked-right" &#124; "docked-bottom" &#124; "floating")</code> |  | **required**. Docked-top &#124; docked-left &#124; docked-right &#124; docked-bottom &#124; floating |
| **header** | <code>Struct{collapse: ?Struct{direction: "up" &#124; "left" &#124; "right" &#124; "down", onExpand: Function, onCollapse: Function, isCollapsed: ?Boolean}, content: ?ReactChildren, title: ?ReactChildren, hideTitleWhenExpanded: ?Boolean, menu: ?ReactChildren}</code> |  | *optional*. Header props (collapse, content, title, menu) |
| **loading** | <code>Boolean</code> | <code>false</code> | *optional*. Whether it's loading or not |
| **dark** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should use dark theme |
| **softLoading** | <code>Boolean</code> | <code>false</code> | *optional*. Soft loading |
| **softLoadingDelay** | <code>NonNegativeNumber</code> | <code>0</code> | *optional*. Soft loading delay |
| **children** | <code>ReactChildren</code> |  | **required**. Panel content |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **clearMargin** | <code>enum("top" &#124; "left" &#124; "right" &#124; "bottom")</code> |  | *optional*. : top &#124; left &#124; right &#124; bottom |
| **style** | <code>Object</code> | <code>{}</code> | *optional*. Inline-style overrides for wrapper element |