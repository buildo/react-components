### Examples

```js
initialState = {};

const onConfirm = value => console.log(`confirmed: ${value}`);
const onClear = () => console.log('cleared!');
const onChange = value => setState({ value });

const initialValue = state.value;

<form className='ui form'>
  <ConfirmationInput
    placeholder='Type Word'
    {...{ initialValue, onChange, onConfirm, onClear }}
    text={{ clear: 'clear', toConfirm: 'to confirm' }}
    icon={{ clear: undefined, toConfirm: undefined }}
  />
</form>
```
