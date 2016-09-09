import React from 'react';
import renderer from 'react-test-renderer';
// Because of this bug: https://github.com/facebook/react/issues/7386
// Should be fixed in react 15.4
// import { shallow } from 'enzyme';

import BackgroundDimmer from '../../src/background-dimmer';

// Because of this bug: https://github.com/facebook/react/issues/7386
// Should be fixed in react 15.4
jest.mock('react-dom');

const content = <div className='content'>content</div>;

describe('BackgroundDimmer', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <BackgroundDimmer>
        {content}
      </BackgroundDimmer>
    );
    expect(component).toMatchSnapshot();
  });

  // Ignored because of this bug: https://github.com/facebook/react/issues/7386
  // Should be fixed in react 15.4
  xit('invokes the callback when the background is clicked', () => {
    const onClickOutside = jest.fn();
    const dimmer = shallow( // eslint-disable-line no-undef
      <BackgroundDimmer onClickOutside={onClickOutside}>
        {content}
      </BackgroundDimmer>
    );
    dimmer.find('.main-content-wrapper').simulate('click');
    expect(onClickOutside).toBeCalled();
  });

  // Ignored because of this bug: https://github.com/facebook/react/issues/7386
  // Should be fixed in react 15.4
  xit('doesn\'t invoke the callback when the content is clicked', () => {
    const onClickOutside = jest.fn();
    const dimmer = shallow( // eslint-disable-line no-undef
      <BackgroundDimmer onClickOutside={onClickOutside}>
        {content}
      </BackgroundDimmer>
    );
    dimmer.find('.content').simulate('click');
    expect(onClickOutside).not.toBeCalled();
  });

  describe('getLocals', () => {

    it('uses default props', () => {
      const dimmer = new BackgroundDimmer({
        children: content
      });
      const locals = dimmer.getLocals();
      expect(locals).toMatchSnapshot();
    });

  });

});
