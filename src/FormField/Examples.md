### Examples

#### A typical usage
```js
initialState = { name: '', secret: '' }

function onChange(field, value) {
  setState({ [field]: value })
}

<div>
  <InputField
    id='name'
    label='NAME'
    value={state.value}
    onChange={value => onChange('name', value)}
    required
  />
  <DropdownField
    id='gender'
    label='GENDER'
    value={state.gender}
    options={[
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' }
    ]}
    onChange={value => onChange('gender', value)}
  />
  <PasswordInputField
    id='secret'
    label='SECRET'
    value={state.secret}
    onChange={value => onChange('secret', value)}
  />
</div>
```
