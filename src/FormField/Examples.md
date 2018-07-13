### Examples

#### A typical usage
```js
initialState = { name: '', surname: '', secret: '', disabled: false }

function onChange(field, value) {
  setState({ [field]: value })
}

<FlexView column>
  <FlexView grow>
    <FlexView width={250} marginRight={10}>
      <InputField
        id='name'
        label='NAME'
        value={state.value}
        onChange={value => onChange('name', value)}
        required
      />
    </FlexView>
    <FlexView width={250}>
      <InputField
        id='surname'
        label='SURNAME'
        value={state.value}
        onChange={value => onChange('surname', value)}
        required
      />
    </FlexView>
  </FlexView>
  <DropdownField
    id='gender'
    label='GENDER'
    value={state.gender}
    options={[
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]}
    onChange={value => onChange('gender', value)}
  />
  <FlexView width={60}>
    <TimePickerField
      id='time'
      label='TIME'
      value={state.time}
      onChange={value => onChange('time', value)}
    />
  </FlexView>
  <PasswordInputField
    id='secret'
    label='SECRET'
    value={state.secret}
    onChange={value => onChange('secret', value)}
    required
  />
  <ToggleField
    id='disabled'
    label='DISABLED'
    value={state.disabled}
    onChange={value => onChange('disabled', value)}
  />
</FlexView>
```
