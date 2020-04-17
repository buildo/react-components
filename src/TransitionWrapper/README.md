# TransitionWrapper

To be used with `ReactTransitionGroup` to show transitions for a component

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. The component you want to animate (it must have a unique "key") |
| **component** | <code>union(ReactClass &#124; String)</code> | <code>"div"</code> | *optional*. Custom component to be used as wrapper for `children`. Can be either an html tag name string (eg. 'div', 'span', etc), or a `ReactClass` (eg. `FlexView`) |
| **transitionStyles** | <code>Struct{enter: ?Object, enterActive: ?Object, default: ?Object, leave: ?Object, leaveActive: ?Object}</code> | <code>{}</code> | *optional*. Object with inline-style for each transition event. It's also possible to use `css` classes (formatted in kebab-case) |
| **transitionEnterTimeout** | <code>Number</code> |  | **required**. Duration of enter transition in milliseconds |
| **transitionLeaveTimeout** | <code>Number</code> |  | **required**. Duration of leave transition in milliseconds |
| **onLeave** | <code>Function</code> | <code>"onLeave"</code> | *optional*. Callback for componentDidLeave: useful if you need to do some cleanup |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> | <code>{}</code> | *optional*. Inline-style overrides for wrapper element |