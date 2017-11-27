### Examples

```js
intialState = { checked: false }

function onChange(checked) {
  setState({ checked })
}

<Toggle value={state.checked} onChange={onChange} size='4em' />
```
