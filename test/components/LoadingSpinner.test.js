import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

// Because of this bug: https://github.com/facebook/react/issues/7386
// Should be fixed in react 15.4
// jest.mock('react-dom');

import LoadingSpinner from '../../src/loading-spinner';

describe('LoadingSpinner', () => {

  // disabled because react-dome is mocked out, see above
  xit('renders correctly', () => {
    const component = renderer.create( // eslint-disable-line no-undef
      <LoadingSpinner />
    );
    expect(component).toMatchSnapshot();
  });

  // disabled because react-dome is mocked out, see above
  xit('renders correctly with a message', () => {
    const component = renderer.create( // eslint-disable-line no-undef
      <LoadingSpinner message={{ content: 'loading awesome content' }} />
    );
    expect(component).toMatchSnapshot();
  });

  it('computes message content and style', () => {
    const message = {
      content: 'loading awesome content',
      size: 14,
      color: 'blue'
    };
    const size = '5em';
    const spinner = shallow(
      <LoadingSpinner message={message} size={size} />
    );
    const messageNode = spinner.find('.message');
    expect(messageNode.text()).toBe(message.content);
    expect(messageNode.prop('style').marginTop).toBe(size);
    expect(messageNode.prop('style').fontSize).toBe(message.size);
    expect(messageNode.prop('style').color).toBe(message.color);
  });

  it('computes overlay style', () => {
    const overlayColor = 'green';
    const spinner = shallow(
      <LoadingSpinner overlayColor={overlayColor} />
    );
    const overlayNode = spinner.find('.loading-spinner-overlay');
    expect(overlayNode.prop('style').backgroundColor).toBe(overlayColor);
  });

  it('computes spinner style', () => {
    const size = '5em';
    const color = 'green';
    const spinner = shallow(
      <LoadingSpinner size={size} color={color} />
    );
    const overlayNode = spinner.find('.spinner');
    expect(overlayNode.prop('style').fontSize).toBe(size);
    expect(overlayNode.prop('style').color).toBe(color);
  });

  describe('getLocals', () => {

    it('computes className', () => {
      const spinner = new LoadingSpinner({
        className: 'some-class'
      });
      const { className } = spinner.getLocals();
      expect(className).toContain('loading-spinner');
      expect(className).toContain('some-class');
    });

  });

});
