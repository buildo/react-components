import React from 'react';
import cx from 'classnames';

const ModalWrapper = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    transitionStyles: React.PropTypes.shape({
      enter: React.PropTypes.object,
      enterActive: React.PropTypes.object,
      default: React.PropTypes.object,
      leave: React.PropTypes.object,
      leaveActive: React.PropTypes.object
    }).isRequired,
    transitionEnterTimeout: React.PropTypes.number.isRequired,
    transitionLeaveTimeout: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired
  },

  startAnimation(anim, timeout, callback) {
    const { transitionStyles } = this.props;
    const initState = { animationStart: transitionStyles[anim] };
    const activeState = { animationEnd: transitionStyles[`${anim}Active`] };
    this.replaceState(initState);
    setTimeout(() => {
      this.setState(activeState);
      setTimeout(callback, timeout);
    }, 30); // if the render is too fast the animation fails... 30ms is an empiric value.
  },

  componentWillEnter(callback) {
    this.startAnimation('enter', this.props.transitionEnterTimeout, callback);
  },

  componentDidEnter() {
    this.replaceState({ defaultStyle: this.props.transitionStyles.default });
  },

  componentWillLeave(callback) {
    this.leaving = true;
    this.startAnimation('leave', this.props.transitionLeaveTimeout, callback);
  },

  getStyle() {
    const { style } = this.props;
    const { animationStart, animationEnd, defaultStyle } = this.state;
    const userTransform = (animationEnd || animationStart || defaultStyle).transform;

    return {
      ...style,
      ...defaultStyle,
      ...animationStart,
      ...animationEnd,
      transform: cx(userTransform, style.transform)
    };
  },

  render() {
    if (!this.state) {
      return null;
    }
    const { children, className } = this.props;
    return (
      <div className={className} style={this.getStyle()}>
        {children}
      </div>
    );
  }

});

export default ModalWrapper;
