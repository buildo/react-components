### Examples

#### A typical usage
```js
initialState = {}

function onChange(value) {
  setState({ value })
}

<FlexView column grow>
  {!!state.value && state.value.toString()}
  <DatePicker
    value={state.value}
    onChange={onChange}
    displayFormat='MMMM Do YYYY'
    locale='en'
    minDate={'2017-07-04'}
  />
</FlexView>
```
