`BackgroundDimmer` (component)
==============================

### Creates a full-page dimmed background for its children nodes

Props
-----

|Name|Type|Default|Description
|----|----|-------|-----------
|**children**|<code>node</code>||**required**. Children nodes/elements
|**color**|<code>string</code>|`'black'`|*optional*. Background-color
|**alpha**|<code>number</code>|`0.5`|*optional*. Opacity
|**stopScrollPropagation**|<code>bool</code>||*optional*. Avoid propagation for scroll events
|**onClickOutside**|<code>func</code>||*optional*. Called when user clicks outside children
|**className**|<code>string</code>||*optional*. Additional `className` for wrapper element
|**id**|<code>string</code>||*optional*. Custom `id` for wrapper element
|**style**|<code>object</code>||*optional*. Inline-style overrides for wrapper element