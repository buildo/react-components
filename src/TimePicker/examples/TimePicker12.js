class Example extends React.Component {

  state = {}

  onChange = (value) => this.setState({ value });

  render = () => (
    <TimePicker
      value={this.state.value}
      onChange={this.onChange}
      timeFormat='12h'
    />
  );
}
