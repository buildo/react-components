import React from 'react';
import omit from 'lodash/omit';
import { props, t } from '../utils';

export const Props = {
  children: t.ReactChildren,
  onTimeout: t.Function,
  duration: t.Number,
  uniqueKey: t.maybe(t.String),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
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
    const { children, ...props } = this.props;
    return (
      <div {...omit(props, ['onTimeout', 'duration', 'uniqueKey'])} onMouseEnter={this.clearTimer} onMouseLeave={this.resetTimer}>
        {children}
      </div>
    );
  }

}
