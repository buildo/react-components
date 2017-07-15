`ScrollView` (component)
========================



Props
-----

|Name|Type|Default|Description
|----|----|-------|-----------
|**children**|<code>union(func&#124;node)</code>||**required**. Components/nodes content. If you need to scroll programmatically pass a function and save `scrollTo(x, y, milliseconds)` callback for later use (it will be passed as first argument) ex: `(scrollTo) => { this.scrollTo = scrollTo; return <MyScrollViewContent />; }`
|**scrollX**|<code>bool</code>|`true`|*optional*. Enable horizontal scrolling
|**scrollY**|<code>bool</code>|`true`|*optional*. Enable vertical scrolling
|**scrollPropagation**|<code>bool</code>|`true`|*optional*. Enable scroll propagation
|**easing**|<code>enumObject.keys(easing)</code>|`'easeInOutQuad'`|*optional*. Easing function used when scrolling with `scrollTo`
|**style**|<code>object</code>|`{}`|*optional*. Inline-style overrides for wrapper element