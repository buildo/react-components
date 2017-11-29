### Examples

```js
initialState = {}

const onChange = (value) => setState({ value });

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'orange', label: 'Orange' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mandarin', label: 'Mandarin' }
];

<Dropdown
  value={state.value}
  onChange={onChange}
  placeholder='Select some fruit'
  options={options}
/>
```


#### Dropdowns sizes
Dropdown comes in two different sizes: medium and small
```js
initialState = {}

const onChange = (stateVar) => (value) => setState({ [stateVar]: value });

const { value, value2 } = state;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'orange', label: 'Orange' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mandarin', label: 'Mandarin' }
];
const options2 = [
  { value: 'cabbage', label: 'Cabbage' },
  { value: 'carrot', label: 'Carrot' },
  { value: 'peas', label: 'Peas' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'cucumber', label: 'Cucumber' }
];

<FlexView vAlignContent='center' className='dropdown-list'>
  <Dropdown
    value={state.value}
    onChange={onChange('value')}
    placeholder='Select some fruit'
    options={options}
  />
  <Dropdown
    value={value2}
    onChange={onChange('value2')}
    placeholder='Select some vegetables'
    options={options2}
    size='small'
  />
</FlexView>
```


#### Menu position
When needed (e.g. when there isn't enough space under the dropdown to render the menu), it's possible to force the menu to open on top
```js
intialState = {};

const onChange = (value) => setState({ value });

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'orange', label: 'Orange' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mandarin', label: 'Mandarin' }
];

<Dropdown
  value={state.value}
  onChange={onChange}
  placeholder='Select some fruit'
  options={options}
  menuPosition='top'
/>
```


#### Dropdowns options
* When the `searchable` prop is used, it's possible to search the desired value by writing into the dropdown.\n* Use `Clearable` if it should be possible to reset the selected value clicking on the `delete` icon that will appear once a value is selected.
```js
intialState = {};

const onChange = (value) => setState({ value });

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'orange', label: 'Orange' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'lime', label: 'Lime' },
  { value: 'peach', label: 'Peach' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'banana', label: 'Banana' }
];

<Dropdown
  className='custom'
  value={state.value}
  onChange={onChange}
  searchable
  clearable
  backspaceRemoves
  placeholder='Select some fruit (try to type "Banana")'
  options={options}
/>
```


#### Multiselect
Dropdown could also allow the selection of multiple values
```js
intialState = {};

const onChange = (value) => setState({ value });

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'orange', label: 'Orange' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mandarin', label: 'Mandarin' }
];

<Dropdown
  className='custom'
  value={state.value}
  onChange={onChange}
  multi
  clearable
  placeholder='Select some fruit(s)'
  options={options}
/>
```


#### Groups
Dropdown could also allow the grouping
```js
initialState = {}

const onChange = (value) => setState({ value });

const options = [
  { value: 'cucumber', label: 'Cucumber', category: 'Vegetable'},
  { value: 'apple', label: 'Apple', category: 'Fruit'},
  { value: 'orange', label: 'Orange', category: 'Fruit' },
  { value: 'mandarin', label: 'Mandarin', category: 'Fruit' },
  { value: 'onion', label: 'Onion', category: 'Vegetable' },
  { value: 'peach', label: 'Peach', category: 'Fruit' },
  { value: 'apricot', label: 'Apricot', category: 'Fruit' },
  { value: 'tomato', label: 'Tomato', category: 'Vegetable' },
  { value: 'pineapple', label: 'Pineapple', category: 'Fruit' },
  { value: 'banana', label: 'Banana', category: 'Fruit'},
  { value: 'meat', label: 'Meat' }
];

<Dropdown
  className='custom'
  value={state.value}
  onChange={onChange}
  searchable
  clearable
  backspaceRemoves
  placeholder='Select some fruit (try to type "Banana")'
  options={options}
  groupByKey='category'
/>
```
