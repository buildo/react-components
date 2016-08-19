# Popover

## Composed of two children: trigger (children) and popover. After a particular event on the trigger (usually "hover" or "click") it renders the popover and positions it relative to it.

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | the trigger node. It's always visible |
| popover | Struct{content: ReactChildren, attachToBody: ?Boolean, position: ?"top" | "bottom" | "left" | "right", anchor: ?"start" | "center" | "end", event: ?"click" | "hover", onShow: ?Function, onHide: ?Function, onToggle: ?Function, dismissOnScroll: ?Boolean, dismissOnClickOutside: ?Boolean, className: ?String, id: ?String, maxWidth: ?Number | String, distance: ?Number, offsetX: ?Number, offsetY: ?Number, isOpen: ?Boolean} | "" | popover settings. The popover is **not** always visible |
| id | String | "" | custom `id` for wrapper element |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |