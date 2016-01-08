`Toaster` (component)
=====================

### Renders and animates toasts (children) inline or in a portal

Props
-----

|Name|Type|Default|Description
|-|-|-|-
|**children**|<code>node</code>||**required**. List of toasts (any node with a unique key)
|**attachTo**|<code>string</code>||*optional*. Id of the element you want to render the `Toaster` in
|**transitionGroup**|<code>object</code>|`{}`|*optional*. Custom settings for `ReactTransitionGroup`
|**transitionStyles**|<code>object</code>||*optional*. Object with style for each transition event (used by `TransitionWrapper`)
|**transitionEnterTimeout**|<code>number</code>||**required**. Duration of enter transition in milliseconds (used by `TransitionWrapper`)
|**transitionLeaveTimeout**|<code>number</code>||**required**. Duration of leave transition in milliseconds (used by `TransitionWrapper`)
|**id**|<code>string</code>||*optional*. 
|**className**|<code>string</code>||*optional*. 
|**style**|<code>object</code>||*optional*. 