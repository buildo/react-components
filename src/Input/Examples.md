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
