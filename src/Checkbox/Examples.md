### Examples

```js
const [state, setState] = React.useState(true);

const onChange = value => setState({ value });

const value = state.value;

<form className="ui form">
  <Checkbox value={value} onChange={onChange} text="Foo" />
</form>;
```
