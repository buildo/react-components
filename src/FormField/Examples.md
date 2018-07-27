### Examples

#### A typical usage
```js
initialState = { name: '', surname: '', secret: '', disabled: false }

function onChange(field, value) {
  setState({ [field]: value })
}

<FlexView column>
  <FlexView width={450}>
    <InputField
      id='name'
      label='LABEL'
      placeholder='Placeholder'
      value={state.value}
      onChange={value => onChange('name', value)}
      required
    />
  </FlexView>
  <FlexView width={450}>
    <DropdownField
      id='gender'
      label='LABEL'
      value={state.gender}
      options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]}
      dropdownRenderer={(props) => <Dropdown {...props} searchable />}
      onChange={value => onChange('gender', value)}
      placeholder='Select'
      required
    />
  </FlexView>
  <FlexView>
    <FlexView width={215} marginRight={20}>
      <DatePickerField
        id='birthDate'
        label='LABEL'
        value={state.birthDate}
        onChange={value => onChange('birthDate', value)}
        viewProps={{ grow: false }}
      />
    </FlexView>
    <FlexView width={215}>
      <TimePickerField
        id='birthTime'
        label='LABEL'
        value={state.birthTime}
        onChange={value => onChange('birthTime', value)}
      />
    </FlexView>
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
