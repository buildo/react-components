import React from 'react';
import renderer from 'react-test-renderer';

import BrowserDetector from '../../src/BrowserDetector';

function forceUserAgent(ua) {
  navigator.__defineGetter__('userAgent', () => ua);
}

const placeholder = (ua) => <div>{`${ua.name} is not supported`}</div>;

describe('BrowserDetector', () => {

  it('displays the content if browser is allowed', () => {
    forceUserAgent('chrome');
    const content = <div>My awesome content</div>;
    const component = renderer.create(
      <BrowserDetector supportedBrowsers={['chrome']} placeholder={placeholder}>
        {content}
      </BrowserDetector>
    );
    const renderedContent = renderer.create(content);
    expect(component.toJSON()).toEqual(renderedContent.toJSON());
  });

  it('displays the placeholder if browser is not allowed', () => {
    forceUserAgent('safari');
    const content = <div>My awesome content</div>;
    const component = renderer.create(
      <BrowserDetector supportedBrowsers={['chrome']} placeholder={placeholder}>
        {content}
      </BrowserDetector>
    );
    const renderedPlaceholder = renderer.create(
      <div>Safari is not supported</div>
    );
    expect(component.toJSON()).toEqual(renderedPlaceholder.toJSON());
  });

});
