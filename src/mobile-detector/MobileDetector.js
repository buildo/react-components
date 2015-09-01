import React from 'react';
import MobileDetect from 'mobile-detect';

const MobileDetector = React.createClass({

  propTypes: {
    children: React.PropTypes.func.isRequired,
    forceDesktop: React.PropTypes.bool,
    userAgent: React.PropTypes.string
  },

  childContextTypes: {
    isDesktop: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isPhone: React.PropTypes.bool.isRequired,
    isTablet: React.PropTypes.bool.isRequired
  },

  getChildContext() {
    return this.getEnvironmentInfo();
  },

  getEnvironmentInfo() {
    const md = new MobileDetect(this.props.userAgent || window.navigator.userAgent);
    return {
      isDesktop: !this.isMobile(md),
      isMobile: this.isMobile(md),
      isPhone: this.isPhone(md),
      isTablet: this.isTablet(md)
    };
  },

  isPhone(md) {
    return !this.props.forceDesktop && !!md.phone();
  },

  isTablet(md) {
    return !this.props.forceDesktop && !!md.tablet();
  },

  isMobile(md) {
    return !this.props.forceDesktop && !!md.mobile();
  },

  render() {
    return this.props.children(this.getEnvironmentInfo());
  }

});

module.exports = MobileDetector;
