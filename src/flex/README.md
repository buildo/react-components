`FlexView` (component)
======================



Props
-----

|Name|Type|Default|Description
|-|-|-|-
|**children**|<code>node</code>||*optional*. FlexView content
|**column**|<code>bool</code>||*optional*. Flex-direction: column
|**auto**|<code>bool</code>||*optional*. Set flex: 0 0 100% NOTE: each property may be overwritten by their own props (grow, shrink, basis)
|**vAlignContent**|<code>enum('top'&#124;'center'&#124;'bottom')</code>||*optional*. Align content vertically
|**hAlignContent**|<code>enum('left'&#124;'center'&#124;'right')</code>||*optional*. Align content horizontally
|**marginLeft**|<code>union(string&#124;number)</code>||*optional*. Margin-left property ("auto" to align self right)
|**marginTop**|<code>union(string&#124;number)</code>||*optional*. Margin-top property ("auto" to align self bottom)
|**marginRight**|<code>union(string&#124;number)</code>||*optional*. Margin-right property ("auto" to align self left)
|**marginBottom**|<code>union(string&#124;number)</code>||*optional*. Margin-bottom property ("auto" to align self top)
|**grow**|<code>union(bool&#124;number)</code>||*optional*. Flex-grow property (for parent primary axis)
|**shrink**|<code>union(bool&#124;number)</code>||*optional*. Flex-shrink property
|**basis**|<code>union(string&#124;number)</code>||*optional*. Flex-basis property
|**wrap**|<code>bool</code>||*optional*. Wrap content
|**height**|<code>union(string&#124;number)</code>||*optional*. Height property (for parent secondary axis)
|**width**|<code>union(string&#124;number)</code>||*optional*. Width property (for parent secondary axis)
|**flexBasis**|<code>union(string&#124;number)</code>||*optional*. **DEPRECATED**: use "basis" instead
|**className**|<code>string</code>|`''`|*optional*. 
|**style**|<code>object</code>|`{}`|*optional*. 