import { PureComponent } from 'react';

type Browser = 'chrome' | 'firefox' | 'safari' | 'msie' | 'msedge' | 'opera';

export type BrowserDetectorProps = {
  children: any, // TODO: t.ReactChildren
  placeholder: (detectedBrowser: string) => any, // TODO: t.ReactChildren
  supportedBrowsers?: Browser[],
  userAgent?: string
}

export default class BrowserDetector extends PureComponent<BrowserDetectorProps, void> {}
