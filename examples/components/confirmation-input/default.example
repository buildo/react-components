class Example extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onConfirm = value => console.log(`confirmed: ${value}`)

  onClear = () => console.log('cleared!')

  onChange = value => this.setState({ value })

  render() {
    const {
      state: { value: initialValue },
      onChange, onConfirm, onClear
    } = this;

    return (
      <form className='ui form'>
        <ConfirmationInput
          {...{ initialValue, onChange, onConfirm, onClear }}
          text={{ clear: 'clear', toConfirm: 'to confirm' }}
          icon={{ clear: undefined, toConfirm: undefined }}
        />
      </form>
    );
  }
}
