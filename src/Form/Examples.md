Wrapper for form that adds a submit button with management of the processing state, submit on enter, and error management features.

### Examples

#### Submit on enter behavior

Submit by pressing the button, or the Enter key; it can also be disabled through the corresponding prop.

```js
initialState = {
  firstName: "",
  lastName: ""
};

const onChange = key => value => setState({ [key]: value });

<Form.Form
  submitLabel="Confirm or press enter..."
  onSubmit={() => {
    return new Promise(resolve =>
      setTimeout(() => {
        alert("submitted!");
        resolve();
      }, 1000)
    );
  }}
>
  <InputField
    label="First name"
    value={state.firstName}
    onChange={onChange("firstName")}
  />
  <InputField
    label="Last name"
    value={state.lastName}
    onChange={onChange("lastName")}
  />
</Form.Form>;
```

#### Custom submit actions

```js
initialState = {
  firstName: "",
  lastName: ""
};

const onChange = key => value => setState({ [key]: value });

<Form.Form
  submitLabel="Confirm or press enter..."
  onSubmit={() => {
    return new Promise(resolve =>
      setTimeout(() => {
        alert("submitted!");
        resolve();
      }, 1000)
    );
  }}
  renderSubmit={submitButtonProps => (
    <FlexView width="100%" hAlignContent="right" className="submit-section">
      <Button
        negative
        buttonState="ready"
        label="cancel"
        onClick={() => {
          alert("Canceling!");
        }}
        style={{ marginRight: 15 }}
      />
      <Button {...submitButtonProps} />
    </FlexView>
  )}
>
  <InputField label="Name" value={state.lastName} onChange={onChange("name")} />
</Form.Form>;
```
