# Popover

Composed of two children: trigger (children) and popover. After a particular event on the trigger (usually "hover" or "click") it renders the popover and positions it relative to it.

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. The trigger node. It's always visible |
| **popover** | <code>Struct{content: ReactChildren, auto: ?Boolean, attachToBody: ?Boolean, position: ?"top" &#124; "bottom" &#124; "left" &#124; "right", anchor: ?"start" &#124; "center" &#124; "end", event: ?"click" &#124; "hover", onShow: ?Function, onHide: ?Function, onToggle: ?Function, dismissOnScroll: ?Boolean, dismissOnClickOutside: ?Boolean, className: ?String, style: ?Object, id: ?String, maxWidth: ?Number &#124; String, distance: ?Number, offsetX: ?Number, offsetY: ?Number, isOpen: ?Boolean, delay: ?Integer &#124; {whenClosed: ?Integer, whenOpen: ?Integer}, contextTypes: ?Object, context: ?Object}</code> |  | **required**. Popover settings. The popover is **not** always visible |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |