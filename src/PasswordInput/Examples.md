### Examples

```js
initialState = { value: '' };

const onChange = value => setState({ value });

<form className='ui form'>
  <PasswordInput
    placeholder='super secret password'
    value={state.value}
    onChange={onChange}
  />
</form>
```
