// import TimePicker from 'buildo-react-components/lib/TimePicker';

class Example extends React.Component {

  state = { value: { hours: 11, minutes: 23 } }

  onChange = (value) => this.setState({ value });

  render = () => {

    const minTime = { hours: 8, minutes: 30 };
    const maxTime = { hours: 18, minutes: 30 };

    return (
      <TimePicker
        value={this.state.value}
        minTime={minTime}
        maxTime={maxTime}
        onChange={this.onChange}
        timeFormat='24h'
      />
    );
  }
}
