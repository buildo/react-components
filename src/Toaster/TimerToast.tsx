import * as React from "react";
import omit = require("lodash/omit");

export type TimerToastProps = {
  children: JSX.Element;
  onTimeout: (uniqueKey?: string) => void;
  duration: number;
  uniqueKey?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

export type State = {
  completed: boolean;
};

export class TimerToast extends React.Component<TimerToastProps, State> {
  private timer: number | null = null;

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
      <div
        {...omit(props, ["onTimeout", "duration", "uniqueKey"])}
        onMouseEnter={this.clearTimer}
        onMouseLeave={this.resetTimer}
      >
        {children}
      </div>
    );
  }
}
