import * as React from 'react';
import * as cx from 'classnames';
import omit = require('lodash/omit');
import { props, t, ReactChildren } from '../utils';

export namespace TransitionWrapperProps {
  export type TransitionStyles = {
    enter?: React.CSSProperties,
    enterActive?: React.CSSProperties,
    default?: React.CSSProperties,
    leave?: React.CSSProperties,
    leaveActive?: React.CSSProperties
  }
}

export type TransitionWrapperDefaultProps<CP> = {
  /** object with inline-style for each transition event. It's also possible to use `css` classes (formatted in kebab-case) */
  transitionStyles: TransitionWrapperProps.TransitionStyles,
  /** custom component to be used as wrapper for `children`. Can be either an html tag name string (eg. 'div', 'span', etc), or a `ReactClass` (eg. `FlexView`) */
  component:  keyof React.ReactHTML | React.ComponentClass<CP>,
  /** callback for componentDidLeave: useful if you need to do some cleanup */
  onLeave: () => void,
  style: React.CSSProperties,
};

export type TransitionWrapperRequiredProps = {
  /** the component you want to animate (it must have a unique "key") */
  children: React.ReactNode,
  /** duration of enter transition in milliseconds */
  transitionEnterTimeout: number,
  /** duration of leave transition in milliseconds */
  transitionLeaveTimeout: number,
  className?: string,
};

export type TransitionWrapperProps<CP> = TransitionWrapperRequiredProps & Partial<TransitionWrapperDefaultProps<CP>> & {[k in keyof CP]: CP[k]};
export type TransitionWrapperDefaultedProps<CP> = TransitionWrapperRequiredProps & TransitionWrapperDefaultProps<CP> & {[k in keyof CP]: CP[k]};

export type TransitionWrapperState = {
  animationStart?: React.CSSProperties,
  animationEnd?: React.CSSProperties,
  defaultStyle?: React.CSSProperties,
  transitionClassName?: string
};

const ReactClass = t.irreducible('ReactClass', x => x && x.prototype && (x.prototype instanceof React.Component || t.Function.is(x.prototype.render)));

export const Props = {
  children: ReactChildren,
  component: t.maybe(t.union([ReactClass, t.String])),
  transitionStyles: t.maybe(t.struct({
    enter: t.maybe(t.Object),
    enterActive: t.maybe(t.Object),
    default: t.maybe(t.Object),
    leave: t.maybe(t.Object),
    leaveActive: t.maybe(t.Object)
  })),
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number,
  onLeave: t.maybe(t.Function),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * To be used with `ReactTransitionGroup` to show transitions for a component
 */
@props(Props, { strict: false })
export default class TransitionWrapper<CP> extends React.PureComponent<TransitionWrapperProps<CP>, TransitionWrapperState> {

  static defaultProps: TransitionWrapperDefaultProps<React.HTMLAttributes<HTMLDivElement>> = {
    transitionStyles: {},
    style: {},
    component: 'div',
    onLeave: () => {}
  };

  _replaceState = (state: TransitionWrapperState) => {
    this.state = state;
    this.forceUpdate();
  };

  startAnimation(anim: 'enter' | 'leave', timeout: number, callback: () => void) {
    const { transitionStyles } = this.props as TransitionWrapperDefaultedProps<CP>;
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

  componentWillAppear = (callback: () => void) => this.componentWillEnter(callback);

  componentDidAppear = () => this.componentDidEnter();

  componentWillEnter = (callback: () => void) => (
    this.startAnimation('enter', this.props.transitionEnterTimeout, callback)
  );

  componentDidEnter = () => {
    const { transitionStyles } = this.props as TransitionWrapperDefaultedProps<CP>;
    return this._replaceState({ defaultStyle: transitionStyles.default })
  };

  componentWillLeave = (callback: () => void) => (
    this.startAnimation('leave', this.props.transitionLeaveTimeout, callback)
  );

  componentDidLeave = () => {
    const { onLeave } = this.props as TransitionWrapperDefaultedProps<CP>;
    onLeave()
  }

  getStyle = () => {
    const { style } = this.props as TransitionWrapperDefaultedProps<CP>;
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
    const { children, className, component } = this.props as TransitionWrapperDefaultedProps<CP>;
    const { transitionClassName } = this.state;

    const props = {
      className: cx(className, transitionClassName),
      style: this.getStyle(),
      ...omit(this.props, Object.keys(Props))
    };

    return React.createElement(
      component as any,
      props,
      children
    );
  }

}
