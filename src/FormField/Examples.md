### Examples

#### A typical usage
```js
initialState = { input: '', textarea: '', password: '', toggle: false }

function onChange(field, value) {
  setState({ [field]: value })
}

<FlexView column>
  <FlexView width={450} marginBottom={40}>
    <InputField
      id='input'
      label='LABEL'
      placeholder='Placeholder'
      value={state.input}
      onChange={value => onChange('input', value)}
      required
    />
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <TextareaField
      id='textarea'
      label='LABEL'
      placeholder='Placeholder'
      value={state.textarea}
      onChange={value => onChange('textarea', value)}
      required
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <ToggleField
        id='toggle'
        label='Toggle text'
        value={state.toggle}
        onChange={value => onChange('toggle', value)}
        required
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <DropdownField
      id='dropdown'
      label='LABEL'
      value={state.dropdown}
      options={[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]}
      dropdownRenderer={(props) => <Dropdown {...props} searchable />}
      onChange={value => onChange('dropdown', value)}
      placeholder='Select'
      required
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView width={215} marginRight={20}>
      <DatePickerField
        id='datePicker'
        label='LABEL'
        value={state.datePicker}
        onChange={value => onChange('datePicker', value)}
        viewProps={{ grow: false }}
      />
    </FlexView>
    <FlexView width={215}>
      <TimePickerField
        id='timePicker'
        label='LABEL'
        value={state.timePicker}
        onChange={value => onChange('timePicker', value)}
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <PasswordInputField
      id='password'
      label='LABEL'
      value={state.password}
      onChange={value => onChange('password', value)}
      required
    />
  </FlexView>
</FlexView>
```
