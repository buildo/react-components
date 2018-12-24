### Examples

```js
initialState = { value: "first" };

const onChange = value => setState({ value });

const options = [
  {
    label: "First",
    value: "first"
  },
  {
    label: "Second",
    value: "second"
  },
  {
    label: "Other",
    value: "other"
  }
];

<form className="ui form">
  <RadioGroup value={state.value} onChange={onChange} options={options} />
</form>;
```
