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
      { value: 'mandarin', label: 'Mandarin' }
    ];
    return (
      <Dropdown
        value={value}
        onChange={onChange}
        placeholder='Select some fruit'
        options={options}
        menuPosition='top'
      />
    );
  }

}
