# ScrollView

A scrollable view

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. What to render inside the scroll view |
| **autoshow** | <code>Boolean</code> |  | *optional*. Whether to automatically show scrollbars |
| **forceGemini** | <code>Boolean</code> | <code>true</code> | *optional*. Force ScrollView to use `gemini-scrollbar`s |
| **component** | <code>union(Function &#124; String)</code> | <code>"div"</code> | *optional*. Component to use as the wrapper |
| **componentProps** | <code>Object</code> |  | *optional*. Props to pass to the wrapper component |
| **innerComponent** | <code>union(Function &#124; String)</code> | <code>"div"</code> | *optional*. Component to use as the inner wrapper |
| **innerComponentProps** | <code>Object</code> |  | *optional*. Props to pass to the inner wrapper component |
| **className** | <code>String</code> |  | *optional*. ClassName to pass to the wrapper component |
| **style** | <code>Object</code> |  | *optional*. Style to pass to the wrapper component |