### Examples

#### A typical usage

```js
initialState = {
  input: "",
  textarea: "",
  password: "",
  toggle: false,
  checkbox: false,
  radioGroup: "first"
};

function onChange(field, value) {
  setState({ [field]: value });
}

<FlexView column>
  <FlexView width={450} marginBottom={40}>
    <InputField
      id="input"
      label="LABEL"
      placeholder="Type here..."
      value={state.input}
      onChange={value => onChange("input", value)}
    />
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <TextareaField
      id="textarea"
      label="LABEL"
      placeholder="Type here..."
      value={state.textarea}
      onChange={value => onChange("textarea", value)}
      rows={5}
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <CheckboxField
        id="checkbox"
        label="Checkbox text"
        value={state.checkbox}
        onChange={value => onChange("checkbox", value)}
      />
    </FlexView>
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <ToggleField
        id="toggle"
        label="Toggle text"
        value={state.toggle}
        onChange={value => onChange("toggle", value)}
      />
    </FlexView>
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <RadioGroupField
        id="radio-group"
        label="LABEL"
        options={[
          {
            label: "First",
            value: "first"
          },
          {
            label: "Second",
            value: "second"
          },
          {
            label: "Other",
            value: "other"
          }
        ]}
        value={state.radioGroup}
        onChange={value => onChange("radioGroup", value)}
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <DropdownField
      id="dropdown"
      label="LABEL"
      value={state.dropdown}
      options={[
        { value: "male", label: "Male" },
        { value: "female", label: "Female" }
      ]}
      dropdownRenderer={props => <Dropdown {...props} isSearchable />}
      onChange={value => onChange("dropdown", value)}
      placeholder="Select"
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView width={215} marginRight={20}>
      <DatePickerField
        id="datePicker"
        label="LABEL"
        value={state.datePicker}
        onChange={value => onChange("datePicker", value)}
        viewProps={{ grow: false }}
      />
    </FlexView>
    <FlexView width={215}>
      <TimePickerField
        id="timePicker"
        label="LABEL"
        value={state.timePicker}
        onChange={value => onChange("timePicker", value)}
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <PasswordInputField
      id="password"
      label="LABEL"
      value={state.password}
      onChange={value => onChange("password", value)}
    />
  </FlexView>
</FlexView>;
```

#### Required fields

```js
initialState = {
  input: "",
  textarea: ""
};

function onChange(field, value) {
  setState({ [field]: value });
}

<FlexView column>
  <FlexView width={450} marginBottom={40}>
    <InputField
      id="input-required"
      label="LABEL"
      placeholder="Type here..."
      value={state.input}
      onChange={value => onChange("input", value)}
      required
    />
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <TextareaField
      id="textarea-required"
      label="LABEL"
      placeholder="Type here..."
      value={state.textarea}
      onChange={value => onChange("textarea", value)}
      rows={5}
      required
    />
  </FlexView>
</FlexView>;
```
