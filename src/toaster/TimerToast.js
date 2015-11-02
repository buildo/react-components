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
    return { active: false, completed: false };
  },

  componentDidMount() {
    this.resetTimer();
  },

  resetTimer() {
    const { active, completed } = this.state;
    if (!active && !completed) {
      this.setState({ active: true });
      this.timer = setTimeout(this.onTimeOut, this.props.duration);
    }
  },

  clearTimer() {
    const { active, completed } = this.state;
    if (active && !completed) {
      this.setState({ active: false });
      clearTimeout(this.timer);
    }
  },

  onTimeOut() {
    const { onTimeOut, uniqueKey } = this.props;
    this.setState({ active: false, completed: true }, () => onTimeOut(uniqueKey));
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
