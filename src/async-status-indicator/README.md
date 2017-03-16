# AsyncStatusIndicator

A simple component used to visually divide UI elements

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **state** | <code>enum("ready" &#124; "processing" &#124; "success" &#124; "error")</code> |  | **required**. One of ready &#124; processing &#124; success &#124; error |
| **icons** | <code>{[key: AsyncStatusIndicatorState]: ReactElement}</code> |  | **required**. A dictionary of [state]: ReactElement |
| **labels** | <code>{[key: AsyncStatusIndicatorState]: String}</code> |  | **required**. A dictionary of [state]: string |
| **className** | <code>String</code> |  | *optional*. An optional class name to pass to top level element of the component |
| **style** | <code>Object</code> |  | *optional*. An optional style object to pass to top level element of the component |