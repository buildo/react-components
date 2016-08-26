# Toaster

Renders and animates toasts (children) inline or in a portal

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. List of toasts (any node with a unique key) |
| **attachTo** | <code>String</code> |  | *optional*. Id of the element you want to render the `Toaster` in |
| **transitionGroup** | <code>Object</code> | <code>{}</code> | *optional*. Custom settings for `ReactTransitionGroup` |
| **transitionStyles** | <code>Object</code> |  | *optional*. Object with style for each transition event (used by `TransitionWrapper`) |
| **transitionEnterTimeout** | <code>Number</code> |  | **required**. Duration of enter transition in milliseconds (used by `TransitionWrapper`) |
| **transitionLeaveTimeout** | <code>Number</code> |  | **required**. Duration of leave transition in milliseconds (used by `TransitionWrapper`) |
| **position** | <code>enum("top-left" &#124; "top-right" &#124; "bottom-left" &#124; "bottom-right")</code> | <code>"top-right"</code> | **required**. Top-left &#124; top-right &#124; bottom-left &#124; bottom-right |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |