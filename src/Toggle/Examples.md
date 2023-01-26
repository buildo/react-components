### Examples

```js
const [state, setState] = React.useState({ checked: false });

function onChange(checked) {
  setState({ checked });
}

<Toggle value={state.checked || false} onChange={onChange} size="4em" />;
```
