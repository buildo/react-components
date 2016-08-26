# BackgroundDimmer

Creates a full-page dimmed background for its children nodes

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. Children nodes/elements |
| **color** | <code>String</code> | <code>"black"</code> | *optional*. Background-color |
| **alpha** | <code>Number</code> | <code>0.5</code> | *optional*. Opacity |
| **zIndex** | <code>Number</code> | <code>99999</code> | *optional*. Z-index (BackgroundDimmer has `position: fixed`) |
| **stopScrollPropagation** | <code>Boolean</code> |  | *optional*. Avoid propagation for scroll events |
| **onClickOutside** | <code>Function</code> |  | *optional*. Called when user clicks outside children |
| **width** | <code>union(String &#124; Number)</code> | <code>"auto"</code> | *optional*. CenteredContentWrapper width |
| **maxWidth** | <code>union(String &#124; Number)</code> | <code>"90%"</code> | *optional*. CenteredContentWrapper max-width |
| **height** | <code>union(String &#124; Number)</code> | <code>"auto"</code> | *optional*. CenteredContentWrapper height |
| **maxHeight** | <code>union(String &#124; Number)</code> | <code>"90%"</code> | *optional*. CenteredContentWrapper max-height |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |