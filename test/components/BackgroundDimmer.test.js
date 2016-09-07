import React from 'react';
import render from '../render';
import { shallow } from 'enzyme';

import BackgroundDimmer from '../../src/background-dimmer';

const content = <div className='content'>content</div>;

describe('BackgroundDimmer', () => {

  it('renders correctly', () => {
    const tree = render(
      <BackgroundDimmer>
        {content}
      </BackgroundDimmer>
    );
    expect(tree).toMatchSnapshot();
  });

  it('invokes the callback when the background is clicked', () => {
    const onClickOutside = jest.fn();
    const dimmer = shallow(
      <BackgroundDimmer onClickOutside={onClickOutside}>
        {content}
      </BackgroundDimmer>
    );
    dimmer.find('.main-content-wrapper').simulate('click');
    expect(onClickOutside).toBeCalled();
  });

  it('doesn\'t invoke the callback when the content is clicked', () => {
    const onClickOutside = jest.fn();
    const dimmer = shallow(
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
