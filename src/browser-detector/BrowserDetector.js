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
   * children node rendered when using supported browser
   */
  children: t.ReactChildren,
  /**
   * called when using a non-supported browser. Expected to return valid ReactNode.
   */
  placeholder: t.Function,
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

  shouldRenderPlaceholder = (supportedBrowsers, detectedBrowser) => (
    supportedBrowsers && !some(supportedBrowsers, b => detectedBrowser[b])
  );

  getLocals() {
    const {
      props: { children, userAgent, supportedBrowsers, placeholder },
      shouldRenderPlaceholder, detectBrowser
    } = this;
    const detectedBrowser = detectBrowser(userAgent || window.navigator.userAgent);

    return {
      children,
      placeholder,
      detectedBrowser,
      renderChildren: !shouldRenderPlaceholder(supportedBrowsers, detectedBrowser)
    };
  }

  template({ children, detectedBrowser, renderChildren, placeholder }) {
    return renderChildren ? children : placeholder(detectedBrowser);
  }

}
