### Examples

#### A typical usage
```js
initialState = { value: undefined }

function onChange(value) {
  setState({ value })
}

<FlexView column>
  <DateField
    value={state.value}
    onChange={onChange}
    inputTypeNumber
  />
</FlexView>
```

#### Handle date validation
```js
initialState = {
  value: new Date(),
  isValid: true
}

function onChange(value) {
  setState({ value })
}

function onValidChange(isValid) {
  setState({ isValid })
}

<FlexView column>
  <DateField
    value={state.value}
    onChange={onChange}
    onValidChange={onValidChange} inputTypeNumber
  />
  {`isValid: ${state.isValid}`}
</FlexView>
```
