# LoadingSpinner

Absolute dimmed layer with loading spinner in the center

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **size** | <code>union(String&#124;Number)</code> | <code>"3em"</code> | *optional*. Spinner size |
| **color** | <code>String</code> |  | *optional*. Spinner main color |
| **message** | <code>Struct{content: String, color: ?String, size: ?String &#124; Number}</code> |  | *optional*. Spinner message |
| **overlayColor** | <code>String</code> | <code>"rgba(255, 255, 255, .9)"</code> | *optional*. Dimmed-overlay color |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |