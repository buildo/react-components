import * as React from 'react';
import some = require('lodash/some');
import { props, t, ReactChildren } from '../utils';
import * as bowser from 'bowser';

const browsers: bowser.IBowserVersions = {
  chrome: true,
  firefox: true,
  msie: true,
  msedge: true,
  safari: true,
  android: true,
  ios: true,
  opera: true,
  phantom: true,
  blackberry: true,
  webos: true,
  silk: true,
  bada: true,
  tizen: true,
  seamonkey: true,
  sailfish: true,
  ucbrowser: true,
  qupzilla: true,
  vivaldi: true,
  sleipnir: true,
  kMeleon: true
};

export const Props = {
  children: ReactChildren,
  placeholder: t.Function,
  supportedBrowsers: t.maybe(t.list(t.enums.of(Object.keys(browsers), 'Browser'))),
  userAgent: t.maybe(t.String)
};

export type Browser = keyof bowser.IBowserVersions;
export type DetectedBrowser = bowser.IBowserGrade

export type BrowserDetectorProps = {
  /** children node rendered when using a supported browser */
  children: JSX.Element,
  /** called when using a non-supported browser. Expected to return a valid ReactNode */
  placeholder: (detectedBrowser: DetectedBrowser) => JSX.Element
  /** whitelist of supported browsers. If `undefined` they're all supported */
  supportedBrowsers?: Browser[],
  /** custom user-agent */
  userAgent?: string
};

/**
 * Top-level component which detects browser and renders children/placeholder
 * based on a given whitelist of supported browsers.
 */
@props(Props)
export default class BrowserDetector extends React.PureComponent<BrowserDetectorProps> {

  detectBrowser(userAgent: string): DetectedBrowser {
    return bowser._detect(userAgent);
  }

  shouldRenderPlaceholder(supportedBrowsers: Browser[], detectedBrowser: DetectedBrowser): boolean {
    return supportedBrowsers && !some(supportedBrowsers, b => detectedBrowser[b])
  }

  render() {
    const {
      props: { children, userAgent, supportedBrowsers = [], placeholder },
      shouldRenderPlaceholder, detectBrowser
    } = this;
    const detectedBrowser = detectBrowser(userAgent || window.navigator.userAgent);
    const shouldRenderChildren = !shouldRenderPlaceholder(supportedBrowsers, detectedBrowser);

    return shouldRenderChildren ? children : placeholder(detectedBrowser);
  }

}
