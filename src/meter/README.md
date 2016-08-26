# Meter

## Renders a Meter

|Name|Type|Default|Description|
|----|----|-------|-----------|
| **value** | <code>Number</code> |  | **required**. Current value |
| **min** | <code>Number</code> | <code>0</code> | *optional*. Minimum value |
| **max** | <code>Number</code> | <code>100</code> | *optional*. Maximum value |
| **labelFormatter** | <code>Function</code> | <code>"labelFormatter"</code> | *optional*. Function in which you can define a custom label format |
| **ranges** | <code>Ranges</code> |  | *optional*. Array of Object in which you can define startValue, endValue, labelColor, fillingColor |
| **baseLabelColor** | <code>String</code> |  | *optional*. Fallback labelColor |
| **baseFillingColor** | <code>String</code> |  | *optional*. Fallback fillingColor |
| **baseBackgroundColor** | <code>String</code> |  | *optional*. Fallback backgroundColor |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |