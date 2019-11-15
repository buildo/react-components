### Examples

By default, `TextOverflow` will wrap the truncaded text in a `Popover`, but you can change the rendering method on overflow as you like. In the example below we're wrapping the trimmed text in a Tooltip:

```js
const label = "This is a long text that should overflow";

<FlexView style={{ maxWidth: 150 }}>
  <TextOverflow label={label}>
    {self => (
      <Tooltip popover={{ content: label }} style={{ width: "100%" }}>
        {self}
      </Tooltip>
    )}
  </TextOverflow>
</FlexView>;
```

#### Overflow on resize

`TextOverflow` use `ResizeSensor` to detect resize events. In the following example you can try to resize your window till the overflowing text will change color:

```js
const label = "Resize the browser to trigger TextOverflow";

<TextOverflow label={label} style={{ color: "#1a91eb" }}>
  {self => (
    <div>
      <Tooltip
        popover={{ content: label }}
        style={{ width: "100%", color: "#d1236d" }}
      >
        {self}
      </Tooltip>
    </div>
  )}
</TextOverflow>;
```

TextOverflow can be used in any place. Below we're using it in a `SingleDropdown` label:

```js
intialState = { value: undefined };

const options = [
  {
    value: 1,
    label: "This is the first very long option"
  },
  {
    value: 2,
    label: "This is the second very long option"
  },
  {
    value: 3,
    label: "This is the third very long option"
  }
];

function onChange(value) {
  setState({ value });
}

const formatter = ({ label }) => (
  <FlexView height="100%" vAlignContent="center">
    <TextOverflow label={label}>
      {(self, isOpen) => (
        <Tooltip
          popover={{
            position: "top",
            content: label,
            isOpen,
            attachToBody: true
          }}
          style={{ width: "100%" }}
        >
          {self}
        </Tooltip>
      )}
    </TextOverflow>
  </FlexView>
);

const dropdownProps = {
  options,
  onChange,
  value: state.value,
  style: { width: "100%" }
};

<FlexView style={{ maxWidth: 50 }}>
  <SingleDropdown {...dropdownProps} />
</FlexView>;
```
