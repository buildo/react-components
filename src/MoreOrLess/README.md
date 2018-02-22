# MoreOrLess

A panel used to alternately display a short (less) or a long (more) version of the content.

The short content should be a summary of the long content. Remember the following:
- do not arbitrarily cut the content in the short version, try to provide a summary with the most relevant information
- it's ok to change the layout between the short and long version, to optimize how information is presented
- this is not an overflow component, the content should be semantically the same but summarized in the short version, with only the most relevant information presented

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
