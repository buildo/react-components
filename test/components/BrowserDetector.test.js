import React from 'react';
import render from '../render';

import BrowserDetector from '../../src/browser-detector';

function forceUserAgent(ua) {
  navigator.__defineGetter__('userAgent', () => ua);
}

const placeholder = (ua) => <div>{`${ua.name} is not supported`}</div>;

describe('BrowserDetector', () => {

  it('displays the content if browser is allowed', () => {
    forceUserAgent('chrome');
    const content = <div>My awesome content</div>;
    const tree = render(
      <BrowserDetector supportedBrowsers={['chrome']} placeholder={placeholder}>
        {content}
      </BrowserDetector>
    );
    const renderedContent = render(content);
    expect(tree).toBe(renderedContent);
  });

  it('displays the placeholder if browser is not allowed', () => {
    forceUserAgent('safari');
    const content = <div>My awesome content</div>;
    const tree = render(
      <BrowserDetector supportedBrowsers={['chrome']} placeholder={placeholder}>
        {content}
      </BrowserDetector>
    );
    const renderedPlaceholder = render(<div>Safari is not supported</div>);
    expect(tree).toBe(renderedPlaceholder);
  });

});
