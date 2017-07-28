// import Dropdown from 'buildo-react-components/lib/Dropdown';

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
      { value: 'mandarin', label: 'Mandarin' },
      { value: 'lime', label: 'Lime' },
      { value: 'peach', label: 'Peach' },
      { value: 'apricot', label: 'Apricot' },
      { value: 'pineapple', label: 'Pineapple' },
      { value: 'banana', label: 'Banana' }
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
      />
    );
  }

}
