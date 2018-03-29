### Examples

```js
initialState = { value: '' };

const onChange = value => setState({ value });

const value = state.value;

<form className='ui form'>
  <Input
    placeholder='Placeholder'
    value={value}
    onChange={onChange}
  />
</form>
```
