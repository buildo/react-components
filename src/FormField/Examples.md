### Examples

#### A typical usage
```js
initialState = { name: '', surname: '', secret: '', disabled: false, toggle2: true }

function onChange(field, value) {
  setState({ [field]: value })
}

<FlexView column>
  <FlexView width={450} marginBottom={40}>
    <InputField
      id='name'
      label='LABEL'
      placeholder='Placeholder'
      value={state.value}
      onChange={value => onChange('name', value)}
      required
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <ToggleField
      id='disabled'
      label='Toggle text'
      value={state.disabled}
      onChange={value => onChange('disabled', value)}
    />
    <FlexView marginLeft={45}>
      <ToggleField
        id='disabled'
        label='Toggle text'
        value={state.toggle2}
        onChange={value => onChange('toggle2', value)}
        required
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
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
  <FlexView marginBottom={40}>
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
  <FlexView width={450} marginBottom={40}>
    <PasswordInputField
      id='secret'
      label='LABEL'
      value={state.secret}
      onChange={value => onChange('secret', value)}
      required
    />
  </FlexView>
</FlexView>
```
