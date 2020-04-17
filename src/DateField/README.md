# DateField

A simple component used to visually divide UI elements

## Props

| Name                | Type                                                             | Default | Description                                                                 |
| ------------------- | ---------------------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| **value**           | <code>Date</code>                                                |         | _optional_. JS Date                                                         |
| **onChange**        | <code>Function</code>                                            |         | **required**. Called when there is a new valid value: (value: Date) => void |
| **onValidChange**   | <code>Function</code>                                            |         | _optional_. Called when validity changes: (isValid: boolean) => void        |
| **placeholders**    | <code>Struct{day: ?String, month: ?String, year: ?String}</code> |         | _optional_. Map to pass placeholders to each input field                    |
| **inputTypeNumber** | <code>Boolean</code>                                             |         | _optional_. If `true` it passes `type='number'` to every input field        |
