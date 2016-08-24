# MoreOrLess

A panel used to alternately display short or long version of the content

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. Panel content |
| **expanded** | <code>Boolean</code> |  | **required**. Whether the panel should be expanded or not |
| **onExpandedChange** | <code>Function</code> |  | **required**. Called on toggle |
| **icons** | <code>Struct{expanded: String, collapsed: String}</code> |  | **required**. Icons for expanded and collapsed panel |
| **wrapperProps** | <code>Object</code> |  | *optional*. Props for wrapper FlexView |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |