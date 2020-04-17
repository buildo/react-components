# Toggle

A nice animated Toggle rendered using only CSS

## Props

| Name          | Type                                                          | Default | Description                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **value**     | <code>Boolean</code>                                          |         | _optional_. The current value (`true` if checked)                                                                                                                                                                 |
| **onChange**  | <code>Function</code>                                         |         | _optional_. Callback called when user clicks on the Toggle                                                                                                                                                        |
| **disabled**  | <code>Boolean</code>                                          |         | _optional_. Disable the onClick callback and renders with reduced opacity                                                                                                                                         |
| **valueLink** | <code>Struct{value: ?Boolean, requestChange: Function}</code> |         | _optional_. To be used together with `linkState`                                                                                                                                                                  |
| **size**      | <code>union(String &#124; Number)</code>                      |         | _optional_. The size for the Toggle in whatever unit (px, em, rem ...). It will be used to compute `width`, `height` and `border-radius` as follows: `width: size`, `height: size / 2`, `border-radius: size / 2` |
| **className** | <code>String</code>                                           |         | _optional_. Additional `className` for wrapper element                                                                                                                                                            |
| **style**     | <code>Object</code>                                           |         | _optional_. Inline-style overrides for wrapper element                                                                                                                                                            |
