import React from 'react';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import { props, t, skinnable } from '../utils';

export const Props = {
  children: t.union([t.ReactChildren, t.Function]),
  onFocus: t.maybe(t.Function),
  onBlur: t.maybe(t.Function),
  tabIndex: t.maybe(t.Number),
  component: t.maybe(t.union([t.Function, t.String])),
  ignoreFocus: t.maybe(t.Boolean),
  debounce: t.maybe(t.Integer),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A panel that can get focus
 * @param children - FocusableView content. If a function it gets called with the boolean "focused"
 * @param onFocus - Callback function called on "focus" event
 * @param onBlur - Callback function called on "blur" event
 * @param tabIndex - "tabindex" attribute
 * @param component - Wrapper component for `children`
 * @param ignoreFocus - When `true` the class "focused" is NOT added
 * @param debounce - Debounce onFocus/onBlur events of x millis
 */
@skinnable()
@props(Props, { strict: false })
export default class FocusableView extends React.Component {

  static defaultProps = {
    component: 'div',
    tabIndex: 0,
    onFocus: () => {},
    onBlur: () => {}
  };

  state = { focused: false };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  _onBlur = () => {
    this.setState({ focused: false });
    this.props.onBlur();
  };

  _onFocusBlurEvent = (type) => {
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

  onFocusBlurEventDebounced = debounce(this._onFocusBlurEvent, this.props.debounce)

  onFocusBlurEvent = ({ type }) => (
    !t.Nil.is(this.props.debounce) ? this.onFocusBlurEventDebounced(type) : this._onFocusBlurEvent(type)
  )

  getLocals() {
    const {
      onFocusBlurEvent,
      state: { focused },
      props: { className, ignoreFocus, ...props }
    } = this;

    return {
      ...props,
      focused,
      className: !ignoreFocus ? cx(className, { focused }) : className,
      onFocus: onFocusBlurEvent,
      onBlur: onFocusBlurEvent
    };
  }

  template({ children, component, focused, ...locals }) {
    return React.createElement(
      component,
      locals,
      t.Function.is(children) ? children(focused) : children
    );
  }

}
