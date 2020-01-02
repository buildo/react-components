import * as React from "react";
import * as cx from "classnames";
import debounce = require("lodash/debounce");
import { Children } from "../utils";
import isFunction = require("lodash/isFunction");

export type FocusableViewRequiredProps = {
  /** FocusableView content. If a function it gets called with the boolean "focused" */
  children: ((focused: boolean) => Children) | Children;
  /** Debounce onFocus/onBlur events of x millis */
  debounce?: number;
  className?: string;
  style?: React.CSSProperties;
};

export type FocusableViewDefaultProps = {
  /** When `true` the class "focused" is NOT added */
  ignoreFocus: boolean;
  /** Callback function called on "focus" event */
  onFocus: () => void;
  /** Callback function called on "blur" event */
  onBlur: () => void;
  /** "tabindex" attribute */
  tabIndex: number;
  /** Wrapper component for `children` */
  component: keyof React.ReactHTML | React.ComponentClass<{}>;
};

export namespace FocusableView {
  export type Props = Partial<FocusableViewDefaultProps> &
    FocusableViewRequiredProps;
}

type FocusableViewDefaultedProps = FocusableViewRequiredProps &
  FocusableViewDefaultProps;

/**
 * A panel that can get focus
 */
export class FocusableView extends React.Component<FocusableView.Props> {
  static defaultProps: FocusableViewDefaultProps = {
    ignoreFocus: false,
    component: "div",
    tabIndex: 0,
    onFocus: () => {},
    onBlur: () => {}
  };

  defaultedProps = () => this.props as FocusableViewDefaultedProps;

  state = { focused: false };
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _onFocus = () => {
    this.setState({ focused: true });
    this.defaultedProps().onFocus();
  };

  _onBlur = () => {
    this.setState({ focused: false });
    this.defaultedProps().onBlur();
  };

  _onFocusBlurEvent = (type: string) => {
    const {
      _mounted,
      state: { focused }
    } = this;

    if (!_mounted) {
      return;
    }

    if (type === "blur" && focused) {
      this._onBlur();
    } else if (type === "focus" && !focused) {
      this._onFocus();
    }
  };

  onFocusBlurEventDebounced: ((type: string) => void) & _.Cancelable = debounce(
    this._onFocusBlurEvent,
    this.defaultedProps().debounce
  );

  onFocusBlurEvent = ({ type }: React.FocusEvent<HTMLElement>) =>
    this.defaultedProps().debounce != null
      ? this.onFocusBlurEventDebounced(type)
      : this._onFocusBlurEvent(type);

  render() {
    const {
      onFocusBlurEvent,
      state: { focused }
    } = this;

    const {
      className,
      ignoreFocus,
      children,
      component,
      debounce,
      ...props
    } = this.defaultedProps();

    const locals = {
      ...props,
      className: !ignoreFocus ? cx(className, { focused }) : className,
      onFocus: onFocusBlurEvent,
      onBlur: onFocusBlurEvent
    };

    return React.createElement(
      component as any,
      locals,
      isFunction(children) ? children(focused) : children
    );
  }
}
