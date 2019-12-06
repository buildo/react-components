### Examples

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  { value: "apple", label: "Apple" },
  { value: "avocado", label: "Avocado" },
  { value: "orange", label: "Orange" },
  { value: "lemon", label: "Lemon" },
  { value: "mandarin", label: "Mandarin" }
];

<SingleDropdown
  value={state.value}
  onChange={onChange}
  placeholder="Select some fruit"
  options={options}
/>;
```

#### Dropdowns sizes

Dropdown comes in two different sizes: medium and small

```js
initialState = {};

const onChange = stateVar => value => setState({ [stateVar]: value });

const { value, value2 } = state;

const options = [
  { value: "apple", label: "Apple" },
  { value: "avocado", label: "Avocado" },
  { value: "orange", label: "Orange" },
  { value: "lemon", label: "Lemon" },
  { value: "mandarin", label: "Mandarin" }
];
const options2 = [
  { value: "cabbage", label: "Cabbage" },
  { value: "carrot", label: "Carrot" },
  { value: "peas", label: "Peas" },
  { value: "tomato", label: "Tomato" },
  { value: "cucumber", label: "Cucumber" }
];

<FlexView vAlignContent="center" className="dropdown-list">
  <SingleDropdown
    value={state.value}
    onChange={onChange("value")}
    placeholder="Select some fruit"
    options={options}
  />
  <SingleDropdown
    value={value2}
    onChange={onChange("value2")}
    placeholder="Select some vegetables"
    options={options2}
    size="small"
  />
</FlexView>;
```

#### Menu position

When needed (e.g. when there isn't enough space under the dropdown to render the menu), it's possible to force the menu to open on top

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  { value: "apple", label: "Apple" },
  { value: "avocado", label: "Avocado" },
  { value: "orange", label: "Orange" },
  { value: "lemon", label: "Lemon" },
  { value: "mandarin", label: "Mandarin" }
];

<SingleDropdown
  value={state.value}
  onChange={onChange}
  placeholder="Select some fruit"
  options={options}
  menuPlacement="top"
/>;
```

#### Dropdowns options

- When the `isSearchable` prop is used, it's possible to search the desired value by writing into the dropdown.\n\* Use `isClearable` if it should be possible to reset the selected value clicking on the `delete` icon that will appear once a value is selected and `backspaceRemovesValue` if you want to be able to remove the last value selected with the backspace button.

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  { value: "apple", label: "Apple" },
  { value: "avocado", label: "Avocado" },
  { value: "orange", label: "Orange" },
  { value: "lemon", label: "Lemon" },
  { value: "mandarin", label: "Mandarin" },
  { value: "lime", label: "Lime" },
  { value: "peach", label: "Peach" },
  { value: "apricot", label: "Apricot" },
  { value: "pineapple", label: "Pineapple" },
  { value: "banana", label: "Banana" }
];

<SingleDropdown
  className="custom"
  value={state.value}
  onChange={onChange}
  isClearable
  isSearchable
  backspaceRemovesValue
  placeholder="Select some fruit (try to type 'Banana')"
  options={options}
/>;
```

#### Multiselect

Dropdown could also allow the selection of multiple values

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  { value: "apple", label: "Apple" },
  { value: "avocado", label: "Avocado" },
  { value: "orange", label: "Orange" },
  { value: "lemon", label: "Lemon" },
  { value: "mandarin", label: "Mandarin" }
];

<MultiDropdown
  className="custom"
  value={state.value}
  onChange={onChange}
  placeholder="Select some fruit(s)"
  options={options}
  isClearable
/>;
```

#### Multiselect with "select all" option

Using a `MultiDropdownWithSelectAll` component, it's possible to automatically add an "all" option that will select all the available options at once.

```js
initialState = {};
const onChange = newVal => {
  if (newVal.type === "AllSelected") {
    console.log("ALL selected!");
  }
  setState({ value: newVal });
};
const options = [
  { value: "apple", label: "Apple" },
  { value: "avocado", label: "Avocado" },
  { value: "orange", label: "Orange" },
  { value: "lemon", label: "Lemon" },
  { value: "mandarin", label: "Mandarin" }
];
<MultiDropdownWithSelectAll
  className="custom"
  value={state.value}
  onChange={onChange}
  placeholder="Select some fruit(s)"
  options={options}
  selectAllLabel="All"
/>;
```

#### Async options

It is also possible to load the dropdown options asynchronously as the user types in the search input box:

```js
initialState = {
  options: [],
  value: null,
  loading: false
};

var timeout = null;

const generateOptions = searchString =>
  searchString
    ? Array.from({ length: 5 }, (_, k) => ({
        value: searchString + k,
        label: searchString + k
      }))
    : [];

const onInputChange = inputString => {
  if (timeout) {
    clearTimeout(timeout);
  }
  if (inputString) {
    setState({ loading: true });
    timeout = setTimeout(() => {
      setState({ options: generateOptions(inputString), loading: false });
    }, 2000);
  } else {
    setState({ options: [] });
  }
};

const onChange = newVal => {
  if (newVal.type === "AllSelected") {
    console.log("ALL selected!");
  }
  setState({ value: newVal });
};

<MultiDropdownWithSelectAll
  className="custom"
  value={state.value}
  isSearchable
  onChange={onChange}
  onInputChange={onInputChange}
  placeholder="Select some fruit(s)"
  options={state.options}
  selectAllLabel="All"
  isLoading={state.loading}
/>;
```

#### Groups

Dropdown could also allow the grouping

```js
initialState = {};

const onChange = value => setState({ value });

const options = [
  {
    label: "Vegetable",
    options: [
      { value: "cucumber", label: "Cucumber" },
      { value: "onion", label: "Onion" },
      { value: "tomato", label: "Tomato" }
    ]
  },
  {
    label: "Fruit",
    options: [
      { value: "apple", label: "Apple" },
      { value: "orange", label: "Orange" },
      { value: "mandarin", label: "Mandarin" },
      { value: "peach", label: "Peach" },
      { value: "apricot", label: "Apricot" },
      { value: "pineapple", label: "Pineapple" },
      { value: "banana", label: "Banana" },
      { value: "meat", label: "Meat" }
    ]
  }
];

<SingleDropdown
  className="custom"
  value={state.value}
  onChange={onChange}
  isSearchable
  placeholder="Select some fruit (try to type 'Banana')"
  options={options}
/>;
```
