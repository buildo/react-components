class Example extends React.Component {

  state = {}

  onChange = (value) => this.setState({ value })

  render() {

    const { onChange, state: { value } } = this;

    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'avocado', label: 'Avocado' },
      { value: 'orange', label: 'Orange' },
      { value: 'lemon', label: 'Lemon' },
      { value: 'mandarin', label: 'Mandarin' }
    ];
    return (
      <Dropdown
        className='custom'
        value={value}
        onChange={onChange}
        multi
        clearable
        placeholder='Select some fruit(s)'
        options={options}
      />
    );
  }

}
