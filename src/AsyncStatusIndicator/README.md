# AsyncStatusIndicator

A component that shows the status of an async operation

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **state** | <code>enum("ready" &#124; "processing" &#124; "success" &#124; "error")</code> |  | **required**. The state of the component |
| **icons** | <code>{[key: AsyncStatusIndicatorState]: ReactElement}</code> |  | **required**. A dictionary of ReactElements for each state |
| **labels** | <code>{[key: AsyncStatusIndicatorState]: String}</code> |  | **required**. A dictionary labels for each state |
| **className** | <code>String</code> |  | *optional*. An optional class name to pass to top level element of the component |
| **style** | <code>Object</code> |  | *optional*. An optional style object to pass to top level element of the component |