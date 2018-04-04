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


```js
initialState = { valueSuccess: 'success', valueFailure: 'failure' };

const onChangeSuccess = valueSuccess => setState({ valueSuccess });
const onChangeFailure = valueFailure => setState({ valueFailure });

const wrapperProps = { style: { marginRight: '10px', width: '150px' } };

<form className='ui form'>
  <FlexView grow>
    <Input
      wrapper={wrapperProps}
      placeholder='Always success'
      status='success'
      value={state.valueSuccess}
      onChange={onChangeSuccess}
    />
    <Input
      wrapper={wrapperProps}
      placeholder='Always failure'
      status='failure'
      value={state.valueFailure}
      onChange={onChangeFailure}
    />
  </FlexView>
</form>
```

#### Password Input

```js
initialState = { value: '' };

const onChange = value => setState({ value });

<PasswordInput
  placeholder='super secret password'
  value={state.value}
  onChange={onChange}
/>
```

#### Confirmation Input

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
