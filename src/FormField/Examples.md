### Examples

#### A typical usage

```js
const [state, setState] = React.useState({
  input: '',
  textarea: '',
  password: '',
  toggle: false,
  checkbox: false,
  radioGroup: 'first',
  dropdown: undefined,
  datePicker: undefined,
  timePicker: undefined
});

function onChange(field, value) {
  setState({ [field]: value });
}

<FlexView column>
  <FlexView width={450} marginBottom={40}>
    <InputField
      id="input"
      label="LABEL"
      hint={{
        type: 'label',
        content: 'Input Hint'
      }}
      inputProps={{
        placeholder: 'Type here...',
        value: state.input,
        onChange: value => onChange('input', value)
      }}
    />
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <TextareaField
      id="textarea"
      label="LABEL"
      hint={{
        type: 'label',
        content: 'Textarea hint'
      }}
      textareaProps={{
        placeholder: 'Type here...',
        value: state.textarea,
        onChange: value => onChange('textarea', value),
        rows: 5
      }}
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <CheckboxField
        id="checkbox"
        label="Checkbox text"
        checkboxProps={{
          value: state.checkbox,
          onChange: value => onChange('checkbox', value)
        }}
      />
    </FlexView>
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <ToggleField
        id="toggle"
        label="Toggle text"
        toggleProps={{
          value: state.toggle,
          onChange: value => onChange('toggle', value)
        }}
      />
    </FlexView>
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView>
      <RadioGroupField
        id="radio-group"
        label="LABEL"
        radioGroupProps={{
          options: [
            {
              label: 'First',
              value: 'first'
            },
            {
              label: 'Second',
              value: 'second'
            },
            {
              label: 'Other',
              value: 'other'
            }
          ],
          value: state.radioGroup,
          onChange: value => onChange('radioGroup', value)
        }}
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <SingleDropdownField
      id="dropdown"
      label="LABEL"
      hint={{
        type: 'label',
        content: 'Dropdown hint'
      }}
      dropdownProps={{
        value: state.dropdown,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        dropdownRenderer: props => <SingleDropdown {...props} isSearchable />,
        onChange: value => onChange('dropdown', value),
        placeholder: 'Select'
      }}
    />
  </FlexView>
  <FlexView marginBottom={40}>
    <FlexView width={215} marginRight={20}>
      <DatePickerField
        id="datePicker"
        label="LABEL"
        viewProps={{ grow: false }}
        hint={{
          type: 'label',
          content: 'DatePicker hint'
        }}
        datePickerProps={{
          value: state.datePicker,
          onChange: value => onChange('datePicker', value)
        }}
      />
    </FlexView>
    <FlexView width={215}>
      <TimePickerField
        id="timePicker"
        label="LABEL"
        hint={{
          type: 'label',
          content: 'TimePicker hint'
        }}
        timePickerProps={{
          value: state.timePicker,
          onChange: value => onChange('timePicker', value)
        }}
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <PasswordInputField
      id="password"
      label="LABEL"
      hint={{
        type: 'label',
        content: 'PasswordInput hint'
      }}
      passwordInputProps={{
        value: state.password,
        onChange: value => onChange('password', value)
      }}
    />
  </FlexView>
</FlexView>;
```

#### Required fields

```js
const [state, setState] = React.useState({ input: '', textarea: '' });

function onChange(field, value) {
  setState({ [field]: value });
}

<FlexView column>
  <FlexView width={450} marginBottom={40}>
    <InputField
      id="input-required"
      label="LABEL"
      inputProps={{
        placeholder: 'Type here...',
        value: state.input,
        onChange: value => onChange('input', value)
      }}
      required
    />
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <TextareaField
      id="textarea-required"
      label="LABEL"
      textareaProps={{
        placeholder: 'Type here...',
        value: state.textarea,
        onChange: value => onChange('textarea', value),
        rows: 5
      }}
      required
    />
  </FlexView>
</FlexView>;
```

#### Input hints

An input hint is a label whose purpose is to give hints to the user about the expected value or format of an input field.
When you want to guide the user through the insertion of a value that could be formatted in different ways, having an example always visible could be crucial.

Based on the form design, the hint could have different styles:

**always visible under a field**

```js
const [state, setState] = React.useState({ input: '' });

function onChange(field, value) {
  setState({ [field]: value });
}

<InputField
  label="ADDRESS"
  hint={{
    type: 'label',
    content: 'e.g. 8156 Old Arlington Road'
  }}
  inputProps={{
    placeholder: 'Type here...',
    value: state.input,
    onChange: value => onChange('input', value)
  }}
/>;
```

**inside a tooltip** that appears on hover or on focus

```js
const [state, setState] = React.useState({ input: '' });

function onChange(field, value) {
  setState({ [field]: value });
}

<InputField
  viewProps={{ width: 300 }}
  label="ADDRESS"
  hint={{
    type: 'tooltip',
    content: 'e.g. 8156 Old Arlington Road'
  }}
  inputProps={{
    placeholde: 'Type here...',
    value: state.input,
    onChange: value => onChange('input', value)
  }}
/>;
```

**always visible in a box** on the right

```js
const [state, setState] = React.useState({ input: '' });

function onChange(field, value) {
  setState({ [field]: value });
}

<InputField
  viewProps={{ width: 500 }}
  label="ADDRESS"
  hint={{
    type: 'box',
    content: 'e.g. 8156 Old Arlington Road'
  }}
  inputProps={{
    placeholder: 'Type here...',
    value: state.input,
    onChange: value => onChange('input', value)
  }}
/>;
```
