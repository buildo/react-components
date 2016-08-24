# ModalManager

Component to manage modals flow/animations inside an app:
- creates a portal `div` on the page `body`
- renders one modal at a time
- supports animations (by using `TransitionWrapper`)

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactElement</code> |  | *optional*. Active modal component |
| **transitionStyles** | <code>Object</code> | <code>{}</code> | *optional*. Object with style for each transition event (used by TransitionWrapper) |
| **transitionEnterTimeout** | <code>Number</code> | <code>0</code> | *optional*. Duration of enter transition in milliseconds (used by TransitionWrapper) |
| **transitionLeaveTimeout** | <code>Number</code> | <code>0</code> | *optional*. Duration of leave transition in milliseconds (used by TransitionWrapper) |
| **getChildContext** | <code>Function</code> | <code>"getChildContext"</code> | *optional*. Callback to get custom context for modals. Can't be updated |
| **childContextTypes** | <code>Object</code> | <code>{}</code> | *optional*. Static object to describe custom context object for modals. Can't be updated |