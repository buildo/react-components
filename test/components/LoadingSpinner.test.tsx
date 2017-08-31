import * as React from 'react';
import { shallow, mount } from 'enzyme';

import LoadingSpinner from '../../src/LoadingSpinner';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

describe('LoadingSpinner', () => {

  it('renders correctly', () => {
    const component = mount(
      <div style={{ position: 'relative' }}>
        <LoadingSpinner />
      </div>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('renders correctly with a message', () => {
    const component = mount(
      <div style={{ position: 'relative' }}>
        <LoadingSpinner message={{ content: 'loading awesome content' }} />
      </div>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('renders with a warning when parent is not relative or absolute', () => {
    /* eslint-disable no-console */
    const warn = jest.fn();
    const originalWarn = console.warn;
    console.warn = warn;
    mount(
      <div style={{ position: 'static' }}>
        <LoadingSpinner />
      </div>
    );
    expect(warn).toHaveBeenCalledTimes(1);
    const warnArguments = warn.mock.calls[0];
    expect(warnArguments[0]).toMatchSnapshot();
    console.warn = originalWarn;
    /* eslint-enable no-console */
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

  it('computes className', () => {
    const spinner = shallow(
      <LoadingSpinner className='some-class' />
    );
    expect(spinner.hasClass('loading-spinner')).toBe(true);
    expect(spinner.hasClass('some-class')).toBe(true);
  });

});
