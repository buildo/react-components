import React from 'react';
import MobileDetect from 'mobile-detect';

/**
 * ### Top-level component which detects device type and passes this info to children as context
 */
const MobileDetector = React.createClass({

  propTypes: {
    /**
     * children must be passed as function so to propagte context correctly. Environment info is also passed as first argument to the callback
     */
    children: React.PropTypes.func.isRequired,
    /**
     * ignores real device type and considers it as desktop
     */
    forceDesktop: React.PropTypes.bool,
    /**
     * custom user-agent
     */
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
