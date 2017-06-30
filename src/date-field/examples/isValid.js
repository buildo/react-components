class Example extends React.Component {

  state = {
    value: new Date(),
    isValid: true
  }

  onChange = (value) => {
    this.setState({ value });
  }

  onValidChange = isValid => this.setState({ isValid })

  render() {
    return (
      <FlexView column>
        <DateField value={this.state.value} onChange={this.onChange} onValidChange={this.onValidChange} inputTypeNumber />
        {`isValid: ${this.state.isValid}`}
      </FlexView>
    );
  }
}
