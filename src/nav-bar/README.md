# NavBar

A NavBar container built with FlexView:
- easy positioning of content (left, center and right columns)
- lets you define basic css style from JS

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **content** | <code>Struct{left: ?ReactChildren, center: ?ReactChildren, right: ?ReactChildren, maxWidth: ?String &#124; Number}</code> |  | **required**. Props used to define the NavBar content (defines left, center, right, maxWidth). |
| **fixed** | <code>Boolean</code> |  | *optional*. To set `position: fixed` |
| **height** | <code>union(String&#124;Number)</code> |  | *optional*. Shorthand for css `height` |
| **background** | <code>String</code> |  | *optional*. Shorthand for css `background` |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |