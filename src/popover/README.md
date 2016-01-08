`Popover` (component)
=====================

### Composed of two children: trigger (children) and popover. After a particular event on the trigger (usually "hover" or "click") it renders the popover and positions it relative to it.

Props
-----

|Name|Type|Default|Description
|----|----|-------|-----------
|**children**|<code>node</code>||**required**. The trigger node. It's always visible
|**popover**|<code>shape[object Object]</code>||**required**. Popover settings. The popover is **not** always visible
|**id**|<code>string</code>||*optional*. 
|**className**|<code>string</code>||*optional*. 
|**style**|<code>object</code>|`{}`|*optional*. 