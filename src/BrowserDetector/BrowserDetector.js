import React from 'react';
import some from 'lodash/some';
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

export const Props = {
  children: t.ReactChildren,
  placeholder: t.Function,
  supportedBrowsers: t.maybe(t.list(Browser)),
  userAgent: t.maybe(t.String)
};

/**
 * Top-level component which detects browser and renders children/placeholder based on a given whitelist of supported browsers.
 * @param children - children node rendered when using a supported browser
 * @param placeholder - called when using a non-supported browser. Expected to return a valid ReactNode.
 * @param supportedBrowsers - whitelist of supported browsers. If `undefined` they're all supported
 * @param userAgent - custom user-agent
 */
@skinnable()
@props(Props)
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
