# ModalManager

## Component to manage modals flow/animations inside an app:
- creates a portal `div` on the page `body`
- renders one modal at a time
- supports animations (by using `TransitionWrapper`)

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactElement | "" | active modal component |
| transitionStyles | Object | {} | object with style for each transition event (used by TransitionWrapper) |
| transitionEnterTimeout | Number | 0 | duration of enter transition in milliseconds (used by TransitionWrapper) |
| transitionLeaveTimeout | Number | 0 | duration of leave transition in milliseconds (used by TransitionWrapper) |
| getChildContext | Function | "getChildContext" | callback to get custom context for modals. Can't be updated |
| childContextTypes | Object | {} | static object to describe custom context object for modals. Can't be updated |