### Examples

Simple wrapper for form that adds "submit on Enter" behavior

```js
initialState = {
  firstName: "",
  lastName: ""
};

const onChange = key => value => setState({ [key]: value });

<Form.Form
  render={ref => (
    <FlexView column grow>
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
      <FlexView marginLeft="auto">
        <Button style={{ width: "100px" }} label="Cancel" onClick={() => {}} />
        <StatefulButton
          primary
          baseState="ready"
          label="Submit"
          ref={ref}
          style={{ width: "100px", marginLeft: "10px" }}
          onClick={() => {
            alert("submitted!");
            return Promise.resolve();
          }}
        />
      </FlexView>
    </FlexView>
  )}
/>;
```
