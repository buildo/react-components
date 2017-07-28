// import Button from 'buildo-react-components/lib/Button';

class Example extends React.Component {

  onClick = () => alert('clicked!');

  render = () => <Button label='Fluid button' fluid onClick={this.onClick} />;
}
