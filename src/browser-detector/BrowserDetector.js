import React from 'react';
import some from 'lodash/collection/some';
import { props, t, skinnable } from '../utils';
import bowser from 'bowser';

const Browser = t.enums.of([
  'chrome',
  'firefox',
  'safari',
  'msie',
  'msedge',
  'opera'
], 'Browser');

/**
 * ### Top-level component which detects browser and renders children/placeholder based on a given whitelist of supported browsers.
 */
@skinnable()
@props({
  /**
   * children node rendered when using a supported browser
   */
  children: t.ReactChildren,
  /**
   * called when using a non-supported browser. Expected to return a valid ReactNode.
   */
  placeholder: t.Function,
  /**
   * whitelist of supported browsers. If `undefined` they're all supported.
   */
  supportedBrowsers: t.maybe(t.list(Browser)),
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
