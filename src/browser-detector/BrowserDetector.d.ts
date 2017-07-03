import { PureComponent } from 'react';

type Browser = 'chrome' | 'firefox' | 'safari' | 'msie' | 'msedge' | 'opera';

export interface DetectedBrowser {    // TODO: use bowser typings
    name: string;
    version: string|number;
    osversion: string|number;
}


export type BrowserDetectorProps = {
  children: any, // TODO: t.ReactChildren
  placeholder: (detectedBrowser: DetectedBrowser) => any, // TODO: t.ReactChildren
  supportedBrowsers?: Browser[],
  userAgent?: string
}

export default class BrowserDetector extends PureComponent<BrowserDetectorProps, {}> {}
