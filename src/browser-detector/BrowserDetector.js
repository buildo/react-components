import React from 'react';
import some from 'lodash/collection/some';
import every from 'lodash/collection/every';
import includes from 'lodash/collection/includes';
import { props, t, skinnable } from '../utils';
import bowser from 'bowser';

const Browsers = t.irreducible('Browsers', (browsers) => every(browsers, b => includes([
  'chrome',
  'firefox',
  'safari',
  'msie',
  'msedge',
  'opera'
], b)));

/**
 * ### Top-level component which detects device type and passes this info to children as context
 */
@skinnable()
@props({
  /**
   * children node rendered when using not-supported browser
   */
  children: t.maybe(t.Function),
  /**
   * whitelist of supported browsers. If `undefined` fallbacks to `*``
   */
  supportedBrowsers: t.maybe(Browsers),
  /**
   * custom user-agent
   */
  userAgent: t.maybe(t.String)
})
export default class BrowserDetector extends React.Component {

  detectBrowser = (userAgent) => bowser._detect(userAgent);

  shouldRenderChildren = (supportedBrowsers, detectedBrowser) => (
    supportedBrowsers && !some(supportedBrowsers, b => detectedBrowser[b])
  );

  getLocals() {
    const {
      props: { children, userAgent, supportedBrowsers },
      shouldRenderChildren, detectBrowser
    } = this;
    const detectedBrowser = detectBrowser(userAgent || window.navigator.userAgent);

    return {
      children,
      detectedBrowser,
      renderChildren: children && shouldRenderChildren(supportedBrowsers, detectedBrowser)
    };
  }

  template({ children, detectedBrowser, renderChildren }) {
    return renderChildren ? children(detectedBrowser) : null;
  }

}
