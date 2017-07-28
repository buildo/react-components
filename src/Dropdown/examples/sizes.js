// import Dropdown from 'buildo-react-components/lib/Dropdown';

class Example extends React.Component {

  state = {}

  onChange = (stateVar) => (value) => this.setState({ [stateVar]: value })

  render() {

    const { onChange, state: { value, value2 } } = this;

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
    return (
      <FlexView vAlignContent='center' className='dropdown-list'>
        <Dropdown
          value={value}
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
    );
  }

}
