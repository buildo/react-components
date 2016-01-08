`FlexView` (component)
======================



Props
-----

|Name|Type|Default|Description
|-|-|-|-
|**auto**|<code>bool</code>||*optional*. Set flex: 0 0 100% NOTE: each property may be overwritten by their own props (grow, shrink, basis)
|**basis**|<code>union(string&#124;number)</code>||*optional*. Flex-basis property
|**children**|<code>node</code>||*optional*. FlexView content
|**className**|<code>string</code>|`''`|*optional*. 
|**column**|<code>bool</code>||*optional*. Flex-direction: column
|**flexBasis**|<code>union(string&#124;number)</code>||*optional*. **DEPRECATED**: use "basis" instead
|**grow**|<code>union(bool&#124;number)</code>||*optional*. Flex-grow property (for parent primary axis)
|**hAlignContent**|<code>enum('left'&#124;'center'&#124;'right')</code>||*optional*. Align content horizontally
|**height**|<code>union(string&#124;number)</code>||*optional*. Height property (for parent secondary axis)
|**marginBottom**|<code>union(string&#124;number)</code>||*optional*. Margin-bottom property ("auto" to align self top)
|**marginLeft**|<code>union(string&#124;number)</code>||*optional*. Margin-left property ("auto" to align self right)
|**marginRight**|<code>union(string&#124;number)</code>||*optional*. Margin-right property ("auto" to align self left)
|**marginTop**|<code>union(string&#124;number)</code>||*optional*. Margin-top property ("auto" to align self bottom)
|**shrink**|<code>union(bool&#124;number)</code>||*optional*. Flex-shrink property
|**style**|<code>object</code>|`{}`|*optional*. 
|**vAlignContent**|<code>enum('top'&#124;'center'&#124;'bottom')</code>||*optional*. Align content vertically
|**width**|<code>union(string&#124;number)</code>||*optional*. Width property (for parent secondary axis)
|**wrap**|<code>bool</code>||*optional*. Wrap content