# Toaster

## Renders and animates toasts (children) inline or in a portal

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | list of toasts (any node with a unique key) |
| attachTo | String | "" | id of the element you want to render the `Toaster` in |
| transitionGroup | Object | {} | custom settings for `ReactTransitionGroup` |
| transitionStyles | Object | "" | object with style for each transition event (used by `TransitionWrapper`) |
| transitionEnterTimeout | Number | "" | duration of enter transition in milliseconds (used by `TransitionWrapper`) |
| transitionLeaveTimeout | Number | "" | duration of leave transition in milliseconds (used by `TransitionWrapper`) |
| position | ["top-left","top-right","bottom-left","bottom-right"] | "top-right" | top-left - top-right - bottom-left - bottom-right |
| id | String | "" | custom `id` for wrapper element |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |