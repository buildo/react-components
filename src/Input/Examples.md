### Examples

#### Number Input A

```js
initialState = { value: undefined };

const onChange = value => setState({ value });

<div>
  USER INPUT:
  <NumberInput A value={state.value} onChange={onChange} />
  <br />
  SAVED IN FORM STATE (valid number):
  <Input
    readOnly
    disabled
    value={typeof state.value === "number" ? String(state.value) : ""}
  />
</div>;
```

#### Number Input B

```js
initialState = { value: undefined };

const onChange = value => setState({ value });

<div>
  USER INPUT:
  <NumberInput B value={state.value} onChange={onChange} />
  <br />
  SAVED IN FORM STATE (valid number):
  <Input
    readOnly
    disabled
    value={typeof state.value === "number" ? String(state.value) : ""}
  />
</div>;
```

#### Number Input C

```js
initialState = { value: undefined };

const onChange = value => setState({ value });

<div>
  USER INPUT:
  <NumberInput C value={state.value} onChange={onChange} />
  <br />
  SAVED IN FORM STATE (valid number):
  <Input
    readOnly
    disabled
    value={typeof state.value === "number" ? String(state.value) : ""}
  />
</div>;
```

<!-- #### Number Input D

```js
initialState = { value: '' };

const onChange = ({ currentTarget: { value } }) => setState({ value });

<div>
  USER INPUT:
  <div>
  <input type='number' value={state.value} onChange={onChange} />
  </div>
  <br />
  SAVED IN FORM STATE (valid number):
  <Input
    readOnly
    disabled
    value={isNaN(parseFloat(state.value)) ? '' : String(parseFloat(state.value))}
  />
</div>;
``` -->
