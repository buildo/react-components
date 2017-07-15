# Modal

Render a modal window over a dimmed layer

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. Modal content |
| **transitionEnterTimeout** | <code>Number</code> |  | **required**. Transition enter timeout |
| **transitionLeaveTimeout** | <code>Number</code> |  | **required**. Transition leave timeout |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **childContextTypes** | <code>Object</code> |  | *optional*. : context types to pass to the modal React tree |
| **getChildContext** | <code>Function</code> |  | *optional*. : should return context values to pass to the modal React tree |
| **title** | <code>String</code> |  | *optional*. Modal title |
| **footer** | <code>ReactChildren</code> |  | *optional*. Modal footer |
| **iconClose** | <code>ReactChildren</code> |  | *optional*. Close icon |
| **overlay** | <code>{color: ?String, alpha: ?Number}</code> | <code>{   "color": "black",   "alpha": 0.85 }</code> | **required**. Specify 'color' and 'alpha' for the overlay layer |
| **dismissOnClickOutside** | <code>Boolean</code> | <code>true</code> | *optional*. Whether the modal should be dismissed when clicking outside it |
| **onDismiss** | <code>Function</code> | <code>"onDismiss"</code> | *optional*. Called when modal is dismissed |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |