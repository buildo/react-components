class Example extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
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
      <div>
        <p>
          {'This component is based on '}
          <a href='https://github.com/JedWatson/react-select' target='_blank'>
            react-select
          </a>
        </p>
        <Dropdown
          searchable
          clearable
          value={this.state.value}
          onChange={(value) => this.setState({ value })}
          placeholder="Select some fruit.."
          options={options}
        />
      </div>
    );
  }

}
