class Example extends React.Component {

  state = {}

  onChange = (value) => this.setState({ value })

  render() {

    const { onChange, state: { value } } = this;

    const options = [
      { value: 'apple', label: 'Apple', category: 'Fruit'},
      { value: 'orange', label: 'Orange', category: 'Fruit' },
      { value: 'mandarin', label: 'Mandarin', category: 'Fruit' },
      { value: 'onion', label: 'Onion', category: 'Vegetable' },
      { value: 'peach', label: 'Peach', category: 'Fruit' },
      { value: 'apricot', label: 'Apricot', category: 'Fruit' },
      { value: 'tomato', label: 'Tomato', category: 'Vegetable' },
      { value: 'pineapple', label: 'Pineapple', category: 'Fruit' },
      { value: 'cucumber', label: 'Cucumber', category: 'Vegetable'},
      { value: 'banana', label: 'Banana', category: 'Fruit'}
    ];
    return (
      <Dropdown
        className='custom'
        value={value}
        onChange={onChange}
        searchable
        clearable
        backspaceRemoves
        placeholder='Select some fruit (try to type "Banana")'
        options={options}
        groupByKey='category'
      />
    );
  }

}
