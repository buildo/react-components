import React from 'react';

const TimerToast = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    onTimeOut: React.PropTypes.func.isRequired,
    duration: React.PropTypes.number.isRequired,
    uniqueKey: React.PropTypes.string,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getInitialState() {
    return { completed: false };
  },

  componentDidMount() {
    this.resetTimer();
  },

  componentWillUnmount() {
    this.clearTimer();
  },

  resetTimer() {
    if (!this.timer && !this.state.completed) {
      this.timer = setTimeout(this.onTimeOut, this.props.duration);
    }
  },

  clearTimer() {
    if (this.timer && !this.state.completed) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },

  onTimeOut() {
    const { onTimeOut, uniqueKey } = this.props;
    this.timer = null;
    this.setState({ completed: true }, () => onTimeOut(uniqueKey));
  },

  render() {
    const { children, onTimeOut, duration, ...props } = this.props;
    return (
      <div {...props} onMouseEnter={this.clearTimer} onMouseLeave={this.resetTimer}>
        {children}
      </div>
    );
  }

});

export default TimerToast;
