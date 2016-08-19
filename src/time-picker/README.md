# TimePicker

## TimePicker field, used to pick a time from a dropdown

|Name|Type|Default|Description|
|----|----|-------|-----------|
| onChange | Function | "" | onChange handler. It will return an object |
| value | Time | "" | value provided as input. Have to be passed in 24h format. E.g. { hours: 10, minutes: 30 } |
| minTime | Time | {
  "hours": 0,
  "minutes": 0
} | minimum value. Have to be passed in 24h format. Default [00:00] |
| maxTime | Time | {
  "hours": 23,
  "minutes": 59
} | maximum value. Have to be passed in 24h format. Default [23:59] |
| placeholder | String | "--:--" | field placeholder, displayed when there's no value. Default[--:--] |
| timeFormat | ["12h","24h"] | "24h" | format in which options are displayed (12h, 24h) |
| searchable | Boolean | true | enable the search feature |
| id | String | "" | custom `id` for wrapper element |
| className | String | "" | additional `className` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |