import React from 'react';
import { props, t } from '../utils';


@props({
  children: t.ReactChildren,
  onTimeout: t.Function,
  duration: t.Number,
  uniqueKey: t.maybe(t.String),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class TimerToast extends React.Component {

  constructor(props) {
    super(props);
    this.state = { completed: false };
  }

  componentDidMount = () => this.resetTimer();

  componentWillUnmount = () => this.clearTimer();

  resetTimer = () => {
    if (!this.timer && !this.state.completed) {
      this.timer = setTimeout(this.onTimeout, this.props.duration);
    }
  };

  clearTimer = () => {
    if (this.timer && !this.state.completed) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  onTimeout = () => {
    const { onTimeout, uniqueKey } = this.props;
    this.timer = null;
    this.setState({ completed: true }, () => onTimeout(uniqueKey));
  };

  render() {
    const { children, onTimeout, duration, ...props } = this.props;
    return (
      <div {...props} onMouseEnter={this.clearTimer} onMouseLeave={this.resetTimer}>
        {children}
      </div>
    );
  }

}
