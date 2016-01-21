import React from 'react';

export default class TimerToast extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    onTimeout: React.PropTypes.func.isRequired,
    duration: React.PropTypes.number.isRequired,
    uniqueKey: React.PropTypes.string,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    style: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { completed: false };
  }

  componentDidMount = () => this.resetTimer()

  componentWillUnmount = () => this.clearTimer()

  resetTimer = () => {
    if (!this.timer && !this.state.completed) {
      this.timer = setTimeout(this.onTimeout, this.props.duration);
    }
  }

  clearTimer = () => {
    if (this.timer && !this.state.completed) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onTimeout = () => {
    const { onTimeout, uniqueKey } = this.props;
    this.timer = null;
    this.setState({ completed: true }, () => onTimeout(uniqueKey));
  }

  render() {
    const { children, onTimeout, duration, ...props } = this.props;
    return (
      <div {...props} onMouseEnter={this.clearTimer} onMouseLeave={this.resetTimer}>
        {children}
      </div>
    );
  }

}
