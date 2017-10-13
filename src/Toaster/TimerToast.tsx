import * as React from 'react';
import omit = require('lodash/omit');
import { props, t, ReactChildren } from '../utils';

export const Props = {
  children: ReactChildren,
  onTimeout: t.Function,
  duration: t.Number,
  uniqueKey: t.maybe(t.String),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

export type TimerToastProps = {
  children: JSX.Element,
  onTimeout: (uniqueKey?: string) => void,
  duration: number,
  uniqueKey?: string,
  id?: string,
  className?: string,
  style?: React.CSSProperties
};

export type TimerToastState = {
  completed: boolean
};

@props(Props)
export class TimerToast extends React.Component<TimerToastProps, TimerToastState> {

  private timer: number | null;

  state = { completed: false };

  componentDidMount() {
    this.resetTimer();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  resetTimer = () => {
    if (!this.timer && !this.state.completed) {
      this.timer = window.setTimeout(this.onTimeout, this.props.duration);
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
      <div {...omit(props, ['onTimeout', 'duration', 'uniqueKey'])}
        onMouseEnter={this.clearTimer}
        onMouseLeave={this.resetTimer}
      >
        {children}
      </div>
    );
  }

}
