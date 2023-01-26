### Examples

#### A typical usage

```js
const [state, setState] = React.useState({ value: undefined });

function onChange(value) {
  setState({ value });
}

<FlexView column>
  <DateField value={state.value} onChange={onChange} inputTypeNumber />
</FlexView>;
```

#### Handle date validation

```js
const [state, setState] = React.useState({
  value: new Date(),
  isValid: true
});

function onChange(value) {
  setState({ value });
}

function onValidChange(isValid) {
  setState({ isValid });
}

<FlexView column>
  <DateField
    value={state.value}
    onChange={onChange}
    onValidChange={onValidChange}
    inputTypeNumber
  />
  {`isValid: ${state.isValid}`}
</FlexView>;
```
