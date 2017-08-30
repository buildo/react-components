import * as React from 'react';
import * as MobileDetect from 'mobile-detect';
import { props, t } from '../utils';

export type ChildrenArgs = {
  isDesktop: boolean,
  isMobile: boolean,
  isPhone: boolean,
  isTablet: boolean
};

export type MobileDetectorProps = {
  /** children must be passed as function so to propagte context correctly. Environment info is also passed as first argument to the callback */
  children: (childrenArgs: ChildrenArgs) => JSX.Element
  /** ignores real device type and considers it as desktop */
  forceDesktop?: boolean,
  /** custom user-agent */
  userAgent?: string
}

export const Props = {
  children: t.Function,
  forceDesktop: t.maybe(t.Boolean),
  userAgent: t.maybe(t.String)
};

/**
 * Top-level component which detects device type and passes this info to children as context
 */
@props(Props)
export default class MobileDetector extends React.Component<MobileDetectorProps> {

  static childContextTypes = {
    isDesktop: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isPhone: React.PropTypes.bool.isRequired,
    isTablet: React.PropTypes.bool.isRequired
  };

  getChildContext = () => this.getEnvironmentInfo();

  getEnvironmentInfo = () => {
    const md = new MobileDetect(this.props.userAgent || window.navigator.userAgent);
    return {
      isDesktop: !this.isMobile(md),
      isMobile: this.isMobile(md),
      isPhone: this.isPhone(md),
      isTablet: this.isTablet(md)
    };
  };

  isPhone = (md: MobileDetect) => !this.props.forceDesktop && !!md.phone();

  isTablet = (md: MobileDetect) => !this.props.forceDesktop && !!md.tablet();

  isMobile = (md: MobileDetect) => !this.props.forceDesktop && !!md.mobile();

  render() {
    return this.props.children(this.getEnvironmentInfo());
  }

}
