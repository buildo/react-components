### Examples

```js
initialState = { value: '' };

const onChange = value => setState({ value });

<PasswordInput
  placeholder='super secret password'
  value={state.value}
  onChange={onChange}
/>
```
