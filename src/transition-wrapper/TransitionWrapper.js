import React from 'react';
import cx from 'classnames';
import omit from 'lodash/object/omit';
import { props, t } from '../utils';

const ReactClass = t.irreducible('ReactClass', x => x && x.prototype && (x.prototype instanceof React.Component || t.Function.is(x.prototype.render)));

/**
 * ### To be used with `ReactTransitionGroup` to show transitions for a component
 */
const PropTypes = {
  /**
   * the component you want to animate (it must have a unique "key")
   */
  children: t.ReactNode,
  /**
   * custom component to be used as wrapper for `children`.
   * Can be either an html tag name string (eg. 'div', 'span', etc), or a `ReactClass` (eg. `FlexView`)
   */
  component: t.maybe(t.union([ ReactClass, t.String ])),
  /**
   * object with inline-style for each transition event. It's also possible to use `css` classes (formatted in kebab-case)
   */
  transitionStyles: t.maybe(t.struct({
    enter: t.maybe(t.Object),
    enterActive: t.maybe(t.Object),
    default: t.maybe(t.Object),
    leave: t.maybe(t.Object),
    leaveActive: t.maybe(t.Object)
  })),
  /**
   * duration of enter transition in milliseconds
   */
  transitionEnterTimeout: t.Number,
  /**
   * duration of leave transition in milliseconds
   */
  transitionLeaveTimeout: t.Number,
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(PropTypes, { strict: false })
export default class TransitionWrapper extends React.Component {

  static defaultProps = {
    transitionStyles: {},
    style: {},
    component: 'div'
  };

  _replaceState = (state) => {
    this.state = state;
    this.forceUpdate();
  };

  startAnimation(anim, timeout, callback) {
    const { transitionStyles } = this.props;
    const animationStart = transitionStyles[anim];
    const animationEnd = transitionStyles[`${anim}Active`];

    const initState = { animationStart, transitionClassName: anim };
    const activeState = { animationEnd, transitionClassName: cx(anim, `${anim}-active`) };

    this._replaceState(initState);
    setTimeout(() => {
      this.setState(activeState);
      setTimeout(callback, timeout);
    }, 30); // if the render is too fast the animation fails... 30ms is an empiric value.
  }

  componentWillAppear = (callback) => this.componentWillEnter(callback);

  componentDidAppear = (callback) => this.componentDidEnter(callback);

  componentWillEnter = (callback) => (
    this.startAnimation('enter', this.props.transitionEnterTimeout, callback)
  );

  componentDidEnter = () => (
    this._replaceState({ defaultStyle: this.props.transitionStyles.default })
  );

  componentWillLeave = (callback) => (
    this.startAnimation('leave', this.props.transitionLeaveTimeout, callback)
  );

  getStyle = () => {
    const { style } = this.props;
    const { animationStart, animationEnd, defaultStyle } = this.state;
    const userTransform = (animationEnd || animationStart || defaultStyle || {}).transform;

    return {
      ...style,
      ...defaultStyle,
      ...animationStart,
      ...animationEnd,
      transform: cx(userTransform, style.transform)
    };
  };

  render() {
    if (!this.state) {
      return null;
    }
    const { children, className, component } = this.props;
    const { transitionClassName } = this.state;

    const props = {
      className: cx(className, transitionClassName),
      style: this.getStyle(),
      ...omit(this.props, Object.keys(PropTypes))
    };

    return React.createElement(
      component,
      props,
      children
    );
  }

}
