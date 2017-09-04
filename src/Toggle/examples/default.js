// import Toggle from 'buildo-react-components/lib/Toggle';

class Example extends React.Component {

  state = { checked: false };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Toggle value={this.state.checked} onChange={this.onChange} size='4em' />
    );
  }
}
