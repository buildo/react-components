import React from 'react';
import cx from 'classnames';
import { props, t, skinnable } from '../utils';

/** A panel that can get focus
 * @param children - FocusableView content. If a function it gets called with the boolean "focused".
 * @param onFocus - Callback function called on "focus" event
 * @param onBlur - Callback function called on "blur" event
 * @param tabIndex - "tabindex" attribute
 * @param component - Wrapper component for `children`
 * @param ignoreFocus - When `true` the class "focused" is NOT added
 */
@skinnable()
@props({
  children: t.union([t.ReactChildren, t.Function]),
  onFocus: t.maybe(t.Function),
  onBlur: t.maybe(t.Function),
  tabIndex: t.maybe(t.Number),
  component: t.maybe(t.union([t.Function, t.String])),
  ignoreFocus: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}, { strict: false })
export default class FocusableView extends React.Component {

  static defaultProps = {
    component: 'div',
    tabIndex: 0,
    onFocus: () => {},
    onBlur: () => {}
  };

  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  _onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  };

  _onBlur = () => {
    this.setState({ focused: false });
    this.props.onBlur();
  };

  getLocals() {
    const { focused } = this.state;
    const { className, ignoreFocus, ...props } = this.props;
    return {
      ...props,
      focused,
      className: !ignoreFocus ? cx(className, { focused }) : className,
      onFocus: this._onFocus,
      onBlur: this._onBlur
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
