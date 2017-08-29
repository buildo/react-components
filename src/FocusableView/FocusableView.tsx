import * as React from 'react';
import cx from '../utils/classnames';
import debounce = require('lodash/debounce');
import { props, t, ReactChildren } from '../utils';

export type FocusableViewRequiredProps = {
  /** FocusableView content. If a function it gets called with the boolean "focused" */
  children: ((focused: boolean) => React.ReactNode | React.ReactNode[]) | React.ReactNode | React.ReactNode[],
  /** Debounce onFocus/onBlur events of x millis */
  debounce?: number,
  className?: string,
  style?: React.CSSProperties
}

export type FocusableViewDefaultProps = {
  /** When `true` the class "focused" is NOT added */
  ignoreFocus: boolean,
  /** Callback function called on "focus" event */
  onFocus: () => void,
  /** Callback function called on "blur" event */
  onBlur: () => void,
  /** "tabindex" attribute */
  tabIndex: number,
  /** Wrapper component for `children` */
  component: keyof React.ReactHTML | React.ComponentClass<{}>
}

export type FocusableViewProps = Partial<FocusableViewDefaultProps> & FocusableViewRequiredProps

type FocusableViewDefaultedProps = FocusableViewRequiredProps & FocusableViewDefaultProps;

export const Props = {
  children: t.union([ReactChildren, t.Function]),
  onFocus: t.maybe(t.Function),
  onBlur: t.maybe(t.Function),
  tabIndex: t.maybe(t.Number),
  component: t.maybe(t.union([t.Function, t.String])),
  ignoreFocus: t.maybe(t.Boolean),
  debounce: t.maybe(t.Integer),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A panel that can get focus
 */
@props(Props, { strict: false })
export default class FocusableView extends React.Component<FocusableViewProps> {

  static defaultProps: FocusableViewDefaultProps = {
    ignoreFocus: false,
    component: 'div',
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
    const { _mounted, state: { focused } } = this;

    if (!_mounted) {
      return;
    }

    if (type === 'blur' && focused) {
      this._onBlur();
    } else if (type === 'focus' && !focused) {
      this._onFocus();
    }
  }

  onFocusBlurEventDebounced = debounce(this._onFocusBlurEvent, this.defaultedProps().debounce)

  onFocusBlurEvent = ({ type }: React.FocusEvent<HTMLElement>) => (
    !t.Nil.is(this.defaultedProps().debounce) ? this.onFocusBlurEventDebounced(type) : this._onFocusBlurEvent(type)
  )

  render() {

    const {
      onFocusBlurEvent,
      state: { focused },
    } = this;

    const { className, ignoreFocus, children, component, debounce, ...props } = this.defaultedProps();

    const locals = {
      ...props,
      className: !ignoreFocus ? cx(className, { focused }) : className,
      onFocus: onFocusBlurEvent,
      onBlur: onFocusBlurEvent
    };

    return React.createElement(
      component as any,
      locals,
      t.Function.is(children) ? children(focused) : children
    );
  }

}
