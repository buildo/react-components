`TextOverflow` (component)
==========================

### Text view which, if string content is too large, trims it and shows the full content on "hover" with a `Popover` (or custom component if any)

Props
-----

|Name|Type|Default|Description
|----|----|-------|-----------
|**children**|<code>func</code>||*optional*. In case you want to use a custom component (like a `Tooltip`) to render the full content which is passed as the first argument
|**label**|<code>string</code>||**required**. This is the full string
|**id**|<code>string</code>||*optional*. Custom `id` for wrapper element
|**className**|<code>string</code>||*optional*. Additional `className` for wrapper element
|**style**|<code>object</code>||*optional*. Inline-style overrides for wrapper element