# TimePicker

TimePicker field, used to pick a time from a dropdown

## Props

| Name             | Type                                     | Default                                     | Description                                                                                           |
| ---------------- | ---------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **onChange**     | <code>Function</code>                    |                                             | **required**. OnChange handler. It will return an object                                              |
| **value**        | <code>Time</code>                        |                                             | _optional_. Value provided as input. Have to be passed in 24h format. E.g. { hours: 10, minutes: 30 } |
| **minTime**      | <code>Time</code>                        | <code>{ "hours": 0, "minutes": 0 }</code>   | _optional_. Minimum value. Have to be passed in 24h format. Default [00:00]                           |
| **maxTime**      | <code>Time</code>                        | <code>{ "hours": 23, "minutes": 59 }</code> | _optional_. Maximum value. Have to be passed in 24h format. Default [23:59]                           |
| **placeholder**  | <code>String</code>                      | <code>"--:--"</code>                        | _optional_. Field placeholder, displayed when there's no value. Default[--:--]                        |
| **timeFormat**   | <code>enum("12h" &#124; "24h")</code>    | <code>"24h"</code>                          | _optional_. Format in which options are displayed (12h&#124;24h)                                      |
| **searchable**   | <code>Boolean</code>                     | <code>true</code>                           | **required**. Enable the search feature                                                               |
| **id**           | <code>String</code>                      |                                             | _optional_. Custom `id` for wrapper element                                                           |
| **className**    | <code>String</code>                      |                                             | _optional_. Additional `className` for wrapper element                                                |
| **style**        | <code>Object</code>                      |                                             | _optional_. Inline-style overrides for wrapper element                                                |
| **menuPosition** | <code>enum("bottom" &#124; "top")</code> | <code>"bottom"</code>                       | **required**. Whether the menu should open on top or bottom                                           |
| **disabled**     | <code>Boolean</code>                     |                                             | _optional_. Optionally disable the control                                                            |
