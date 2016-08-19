# Meter

## Renders a Meter

|Name|Type|Default|Description|
|----|----|-------|-----------|
| value | Number | "" | current value |
| min | Number | 0 | minimum value |
| max | Number | 100 | maximum value |
| labelFormatter | Function | "labelFormatter" | function in which you can define a custom label format |
| ranges | Ranges | "" | array of Object in which you can define startValue, endValue, labelColor, fillingColor |
| baseLabelColor | String | "" | fallback labelColor |
| baseFillingColor | String | "" | fallback fillingColor |
| baseBackgroundColor | String | "" | fallback backgroundColor |
| id | String | "" | custom `id` for wrapper element |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |