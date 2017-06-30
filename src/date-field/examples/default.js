class Example extends React.Component {

  state = {
    value: undefined
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    return (
      <FlexView column>
        <DateField value={this.state.value} onChange={this.onChange} inputTypeNumber />
      </FlexView>
    );
  }
}
