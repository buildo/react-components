### Examples

#### A typical usage

```js
const [state, setState] = React.useState({});

function onChange(value) {
  setState({ value });
}

<FlexView column grow>
  {!!state.value && state.value.toString()}
  <DatePicker
    value={state.value}
    onChange={onChange}
    displayFormat="MMMM Do YYYY"
    locale="en"
    minDate={new Date()}
  />
</FlexView>;
```
