class Example extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    return (
      <FlexView column grow>
        {!!this.state.value && this.state.value.toString()}
        <DatePicker
          value={this.state.value}
          onChange={this.onChange}
          displayFormat='MMMM Do YYYY'
          locale='fr'
          minDate='2017-07-04'
        />
      </FlexView>
    );
  }
}
