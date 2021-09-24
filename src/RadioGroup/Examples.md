### Examples

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  {
    label: 'First',
    value: 'first'
  },
  {
    label: 'Second',
    value: 'second'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

<form className="ui form">
  <RadioGroup value={state.value} onChange={onChange} options={options} />
  <div style={{ marginTop: 20 }}>Selected: {state.value}</div>
</form>;
```

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  {
    label: 'First',
    value: { position: 'first' }
  },
  {
    label: 'Second',
    value: { position: 'second' }
  },
  {
    label: 'Other',
    value: { position: 'other' }
  }
];

<form className="ui form">
  <RadioGroup
    horizontal
    value={state.value}
    onChange={onChange}
    getValueKey={value => value.position}
    options={options}
  />
  <div style={{ marginTop: 20 }}>Selected: {state.value ? state.value.position : state.value}</div>
</form>;
```
