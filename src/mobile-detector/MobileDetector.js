import React from 'react';
import MobileDetect from 'mobile-detect';
import { props, t } from '../utils';

/**
 * ### Top-level component which detects device type and passes this info to children as context
 */
@props({
  /**
   * children must be passed as function so to propagte context correctly. Environment info is also passed as first argument to the callback
   */
  children: t.Function,
  /**
   * ignores real device type and considers it as desktop
   */
  forceDesktop: t.maybe(t.Boolean),
  /**
   * custom user-agent
   */
  userAgent: t.maybe(t.String)
})
export default class MobileDetector extends React.Component {

  static childContextTypes = {
    isDesktop: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isPhone: React.PropTypes.bool.isRequired,
    isTablet: React.PropTypes.bool.isRequired
  }

  getChildContext = () => this.getEnvironmentInfo()

  getEnvironmentInfo = () => {
    const md = new MobileDetect(this.props.userAgent || window.navigator.userAgent);
    return {
      isDesktop: !this.isMobile(md),
      isMobile: this.isMobile(md),
      isPhone: this.isPhone(md),
      isTablet: this.isTablet(md)
    };
  }

  isPhone = (md) => !this.props.forceDesktop && !!md.phone()

  isTablet = (md) => !this.props.forceDesktop && !!md.tablet()

  isMobile = (md) => !this.props.forceDesktop && !!md.mobile()

  render() {
    return this.props.children(this.getEnvironmentInfo());
  }

}
