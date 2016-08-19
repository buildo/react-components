import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ReactTransitionGroup from 'react-addons-transition-group';
import { props, t } from '../utils';
import { warn } from '../utils/log';
import TransitionWrapper from '../transition-wrapper/TransitionWrapper';

/**
 * Renders and animates toasts (children) inline or in a portal
 * @param children - list of toasts (any node with a unique key)
 * @param attachTo - id of the element you want to render the `Toaster` in
 * @param transitionGroup - custom settings for `ReactTransitionGroup`
 * @param transitionStyles - object with style for each transition event (used by `TransitionWrapper`)
 * @param transitionEnterTimeout - duration of enter transition in milliseconds (used by `TransitionWrapper`)
 * @param transitionLeaveTimeout - duration of leave transition in milliseconds (used by `TransitionWrapper`)
 * @param position - top-left | top-right | bottom-left | bottom-right
 */
@props({
  children: t.ReactChildren,
  attachTo: t.maybe(t.String),
  transitionGroup: t.maybe(t.Object),
  transitionStyles: t.maybe(t.Object),
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number,
  position: t.enums.of(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Toaster extends React.Component {

  static defaultProps = {
    transitionGroup: {},
    position: 'top-right'
  };

  componentWillMount() {
    this.appendToaster();
    this.renderToaster();
  }

  componentDidMount() {
    const node = this.props.attachTo ? this.toaster : ReactDOM.findDOMNode(this).parentNode;
    const { position } = window.getComputedStyle(node);
    if (position !== 'relative' && position !== 'absolute') {
      warn(['Toaster\'s parent node should have "position: relative/absolute"', node]);
    }
  }

  componentWillUnmount() {
    this.removeToaster();
  }

  getTranslationStyle(i) {
    const { position } = this.props;
    const isTop = position.indexOf('top') !== -1;
    const isRight = position.indexOf('right') !== -1;
    const translationBase = isTop ? 100 : -100;
    return {
      transform: `translateY(${translationBase * i}%)`,
      position: 'absolute',
      right: isRight ? 0 : undefined,
      left: isRight ? undefined : 0,
      bottom: isTop ? undefined : 0,
      top: isTop ? 0 : undefined
    };
  }

  getToasts = () => {
    const { children, transitionStyles, transitionEnterTimeout, transitionLeaveTimeout } = this.props;
    return React.Children.map(children, (el, i) => {
      return (
        <TransitionWrapper
          {...{ transitionStyles, transitionEnterTimeout, transitionLeaveTimeout }}
          style={this.getTranslationStyle(i)}
          key={el.key}
        >
          {React.cloneElement(el, { uniqueKey: el.key })}
        </TransitionWrapper>
      );
    });
  };

  appendToaster = () => {
    if (this.props.attachTo) {
      this.toaster = document.getElementById(this.props.attachTo);
    }
  };

  removeToaster = () => {
    if (this.toaster && this.props.attachTo) {
      this.toaster.innerHTML = ''; // stupid??
    }
  };

  getToaster = () => {
    const { style: styleProp, id, className, position } = this.props;
    const isTop = position.indexOf('top') !== -1;
    const isRight = position.indexOf('right') !== -1;
    const style = {
      position: 'absolute',
      right: isRight ? 0 : undefined,
      left: isRight ? undefined : 0,
      bottom: isTop ? undefined : 0,
      top: isTop ? 0 : undefined,
      height: '100%',
      ...styleProp
    };

    return (
      <div className={cx('toaster', className)} {...{ style, id }}>
        <ReactTransitionGroup {...this.props.transitionGroup}>
          {this.getToasts()}
        </ReactTransitionGroup>
      </div>
    );
  };

  renderToaster = () => {
    if (this.props.attachTo) {
      ReactDOM.render(this.getToaster(), this.toaster);
    }
  };

  render() {
    if (this.props.attachTo) {
      return null;
    } else {
      return this.getToaster();
    }
  }

  componentDidUpdate() {
    this.renderToaster();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.attachTo !== nextProps.attachTo) {
      warn('You can\'t change "attachTo" prop after the first render!');
    }
  }

}
