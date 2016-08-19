# Button

## A stateful button element

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **buttonState** | <code>enum("ready"&#124;"not-allowed"&#124;"processing"&#124;"error"&#124;"success")</code> | <code>"ready"</code> | *optional*. Ready, not-allowed, processing, success, error; overrides `baseState`, use it if you want button to be a functional component |
| **onClick** | <code>Function</code> |  | **required**. Callback |
| **label** | <code>union(String&#124;Object)</code> |  | *optional*. Can be a String, or a dictionary { [buttonState]: String }, t.maybe(t.union([t.Str,  stringForButtonStates]) |
| **icon** | <code>union(String&#124;Object)</code> | <code>""</code> | *optional*. Can be a String referring to an icon, or a dictionary { [buttonState]: String },t.maybe(t.union([t.Str, stringForButtonStates])) |
| **children** | <code>String</code> |  | *optional*. Otherwise just pass a string as children |
| **type** | <code>enum("default"&#124;"primary"&#124;"positive"&#124;"negative"&#124;"flat")</code> |  | *optional*. Type of the button (default, primary, positive, negative, flat) |
| **primary** | <code>Boolean</code> | <code>false</code> | *optional*. Shortcut for type "primary" |
| **flat** | <code>Boolean</code> |  | *optional*. Shortcut for type "flat" |
| **size** | <code>enum("tiny"&#124;"small"&#124;"medium")</code> | <code>"medium"</code> | *optional*. Size of the button, one of 'tiny', 'small', 'medium' |
| **fluid** | <code>Boolean</code> | <code>false</code> | *optional*. Fluid (block) button, takes the width of the container |
| **circular** | <code>Boolean</code> | <code>false</code> | *optional*. Circular button, this is allowed only if it's an icon button |
| **textOverflow** | <code>Function</code> | <code>"TextOverflow"</code> | *optional*. Function to handle the overflow of too long labels, replacing with ellipsed string and tooltip |
| **style** | <code>Object</code> | <code>{}</code> | *optional*. Inline-style overrides for wrapper element |
| **className** | <code>String</code> | <code>""</code> | *optional*. Additional `className` for wrapper element |