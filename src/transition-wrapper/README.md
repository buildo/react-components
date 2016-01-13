`TransitionWrapper` (component)
===============================



Props
-----

|Name|Type|Default|Description
|----|----|-------|-----------
|**children**|<code>node</code>||**required**. The component you want to animate (it must have a unique "key")
|**component**|<code>any</code>|`'div'`|*optional*. Custom component to be used as wrapper for `children`
|**transitionStyles**|<code>shape[object Object]</code>|`{}`|*optional*. Object with inline-style for each transition event. It's also possible to use `css` classes (formatted in kebab-case)
|**transitionEnterTimeout**|<code>number</code>||**required**. Duration of enter transition in milliseconds
|**transitionLeaveTimeout**|<code>number</code>||**required**. Duration of leave transition in milliseconds
|**className**|<code>string</code>||*optional*. Additional `className` for wrapper element
|**style**|<code>object</code>|`{}`|*optional*. Inline-style overrides for wrapper element