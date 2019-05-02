### Examples

Simple wrapper for form that adds "submit on Enter" behavior

```js
initialState = {
  firstName: "",
  lastName: ""
};

const onChange = key => value => setState({ [key]: value });

<Form.Form
  column
  submitLabel="submit"
  renderSubmit={props => (
    <StatefulButton
      {...props}
      style={{ ...props.style, width: "300px", marginLeft: "auto" }}
    />
  )}
  onSubmit={() => {
    alert("submitted!");
    return Promise.resolve();
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
