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
      hint={{
        type: "label",
        content: "Input Hint"
      }}
      value={state.input}
      onChange={value => onChange("input", value)}
    />
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <TextareaField
      id="textarea"
      label="LABEL"
      placeholder="Type here..."
      hint={{
        type: "label",
        content: "Textarea hint"
      }}
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
      hint={{
        type: "label",
        content: "Dropdown hint"
      }}
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
        hint={{
          type: "label",
          content: "DatePicker hint"
        }}
      />
    </FlexView>
    <FlexView width={215}>
      <TimePickerField
        id="timePicker"
        label="LABEL"
        value={state.timePicker}
        onChange={value => onChange("timePicker", value)}
        hint={{
          type: "label",
          content: "TimePicker hint"
        }}
      />
    </FlexView>
  </FlexView>
  <FlexView width={450} marginBottom={40}>
    <PasswordInputField
      id="password"
      label="LABEL"
      value={state.password}
      onChange={value => onChange("password", value)}
      hint={{
        type: "label",
        content: "PasswordInput hint"
      }}
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

#### Input hints

An input hint is a label whose purpose is to give hints to the user about the expected value or format of an input field.
When you want to guide the user through the insertion of a value that could be formatted in different ways, having an example always visible could be crucial.

Based on the form design, the hint could have different styles:

**always visible under a field**

```js
initialState = {
  input: ""
};

function onChange(field, value) {
  setState({ [field]: value });
}

<InputField
  label="ADDRESS"
  placeholder="Type here..."
  hint={{
    type: "label",
    content: "e.g. 8156 Old Arlington Road"
  }}
  value={state.input}
  onChange={value => onChange("input", value)}
/>;
```

**inside a tooltip** that appears on hover or on focus

```js
initialState = {
  input: ""
};

function onChange(field, value) {
  setState({ [field]: value });
}

<InputField
  viewProps={{ width: 300 }}
  label="ADDRESS"
  placeholder="Type here..."
  hint={{
    type: "tooltip",
    content: "e.g. 8156 Old Arlington Road"
  }}
  value={state.input}
  onChange={value => onChange("input", value)}
/>;
```

**always visible in a box** on the right

```js
initialState = {
  input: ""
};

function onChange(field, value) {
  setState({ [field]: value });
}

<InputField
  viewProps={{ width: 500 }}
  label="ADDRESS"
  placeholder="Type here..."
  hint={{
    type: "box",
    content: "e.g. 8156 Old Arlington Road"
  }}
  value={state.input}
  onChange={value => onChange("input", value)}
/>;
```
