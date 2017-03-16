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
      { value: 'papaya', label: 'Papaya'},
      { value: 'passionfruit', label: 'Passionfruit'},
      { value: 'peach', label: 'Peach'},
      { value: 'pear', label: 'Pear'},
      { value: 'persimmon', label: 'Persimmon'},
      { value: 'physalis', label: 'Physalis'},
      { value: 'plantain', label: 'Plantain'},
      { value: 'plum', label: 'Plum'},
      { value: 'damson', label: 'Damson'},
      { value: 'dragonfruit', label: 'Dragonfruit'},
      { value: 'durian', label: 'Durian'},
      { value: 'elderberry', label: 'Elderberry'},
      { value: 'feijoa', label: 'Feijoa'},
      { value: 'fig', label: 'Fig'},
      { value: 'gooseberry', label: 'Gooseberry'},
      { value: 'grape', label: 'Grape'},
      { value: 'jackfruit', label: 'Jackfruit'},
      { value: 'jambul', label: 'Jambul'},
      { value: 'jujube', label: 'Jujube'},
      { value: 'kiwifruit', label: 'Kiwifruit'},
      { value: 'kumquat', label: 'Kumquat'},
      { value: 'lime', label: 'Lime'},
      { value: 'loquat', label: 'Loquat'},
      { value: 'longan', label: 'Longan'},
      { value: 'lychee', label: 'Lychee'},
      { value: 'mango', label: 'Mango'},
      { value: 'marionberry', label: 'Marionberry'}
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
