# TransitionWrapper

## To be used with `ReactTransitionGroup` to show transitions for a component

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | the component you want to animate (it must have a unique "key") |
| component | ReactClass | String | "div" | custom component to be used as wrapper for `children`. Can be either an html tag name string (eg. 'div', 'span', etc), or a `ReactClass` (eg. `FlexView`) |
| transitionStyles | Struct{enter: ?Object, enterActive: ?Object, default: ?Object, leave: ?Object, leaveActive: ?Object} | {} | object with inline-style for each transition event. It's also possible to use `css` classes (formatted in kebab-case) |
| transitionEnterTimeout | Number | "" | duration of enter transition in milliseconds |
| transitionLeaveTimeout | Number | "" | duration of leave transition in milliseconds |
| onLeave | Function | "onLeave" | callback for componentDidLeave: useful if you need to do some cleanup |
| className | String | "" | additional `className` for wrapper element |
| style | Object | {} | inline-style overrides for wrapper element |