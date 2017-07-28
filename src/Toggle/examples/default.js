// import Toggle from 'buildo-react-components/lib/Toggle';

class Example extends React.Component {
  render() {
    return (
      <Toggle valueLink={linkState(this, 'checked')} size='4em' />
    );
  }
}
