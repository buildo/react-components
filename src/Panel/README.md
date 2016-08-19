# Panel

## A simple panel with header. It can be collapsable or not, docked or floating.

|Name|Type|Default|Description|
|----|----|-------|-----------|
| type | ["docked-top","docked-left","docked-right","docked-bottom","floating"] | "" | docked-top - docked-left - docked-right - docked-bottom - floating |
| header | Struct{collapse: ?Struct{direction: "up" | "left" | "right" | "down", onExpand: Function, onCollapse: Function, isCollapsed: ?Boolean}, content: ?ReactChildren, title: ?ReactChildren, hideTitleWhenExpanded: ?Boolean, menu: ?ReactChildren} | "" | header props (collapse, content, title, menu) |
| loading | Boolean | false | whether it's loading or not |
| dark | Boolean | false | true if it should use dark theme |
| softLoading | Boolean | false | soft loading |
| softLoadingDelay | NonNegativeNumber | 0 | soft loading delay |
| children | ReactChildren | "" | panel content |
| className | String | "" | additional `className` for wrapper element |
| clearMargin | ["top","left","right","bottom"] | "" | : top - left - right - bottom |
| style | Object | {} | inline-style overrides for wrapper element |