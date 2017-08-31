import * as React from 'react';
import { mount } from 'enzyme';

import StatefulButton, { StatefulButtonProps } from '../../src/Button/StatefulButton';
import clone = require('lodash/clone');

let consoleError: jest.SpyInstance<{}>

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

function timeoutPromise(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

const exampleProps: StatefulButtonProps = {
  ...StatefulButton.defaultProps,
  label: 'BeautifulButton',
  onClick: timeoutPromise.bind(this, 5),
  baseState: 'ready',
  stableSuccess: false,
  timerMillis: 5
};

type Overrides = {
  children?: string,
  [x: string]: any
};

function jsxComponent({ children, ...overrides } : Overrides) {
  return <StatefulButton {...exampleProps}  label={children || 'BeautifulButton'} {...overrides} />;
}

describe('StatefulButton', () => {

  it('renders correctly', () => {
    const component = mount(
      <StatefulButton {...exampleProps} />
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('behaves correctly in base state', () => {
    const component = mount(jsxComponent({
      stableSuccess: false
    }));
    expect(component.prop('baseState')).toBe('ready');
    expect(component.find('.button-label span').first().text()).toBe('BeautifulButton');
  });

  it('passes through state if provided as prop', () => {
    const component = mount(jsxComponent({
      children: 'Button with error',
      buttonState: 'error'
    }));
    const buttonInner = component.find('.button-inner');
    expect(buttonInner.hasClass('is-error')).toBe(true);
    expect(buttonInner.children()).toBeDefined();
    expect(component.prop('label')).toBe('Button with error');
  });

  describe('with unstable success state', () => {
    it('switches to processing, success, ready on click', () => {
      const component = mount(jsxComponent({
        stableSuccess: false
      }));
      const buttonInner = component.find('.button-inner');
      buttonInner.simulate('click');
      expect(buttonInner.hasClass('is-processing')).toBe(true);
      return timeoutPromise(6).then(() => {
        expect(buttonInner.hasClass('is-success')).toBe(true);
        return timeoutPromise(5);
      }).then(() =>
        expect(buttonInner.hasClass('is-ready')).toBe(true)
      );
    });
  });

  describe('with stable success state', () => {
    it('switches to processing, success and stop there, on click', () => {
      const component = mount(jsxComponent({
        stableSuccess: true
      }));

      const buttonInner = component.find('.button-inner');
      buttonInner.simulate('click');
      expect(buttonInner.hasClass(`is-processing`)).toBe(true);

      return timeoutPromise(6).then(() => {
        expect(buttonInner.hasClass('is-success')).toBe(true);
        return timeoutPromise(5);
      }).then(() =>
        expect(buttonInner.hasClass('is-success')).toBe(true)
      );
    });

    it('switches to processing, success and back to baseState when baseState is changed after click', () => {
      const component = mount(jsxComponent({
        stableSuccess: true
      }));
      const buttonInner = component.find('.button-inner');
      buttonInner.simulate('click');
      expect(buttonInner.hasClass('is-processing')).toBe(true);
      const newProps = clone(component.props);
      newProps.baseState = 'not-allowed';
      component.setProps(newProps);
      return timeoutPromise(7).then(() =>
        expect(buttonInner.hasClass('is-not-allowed')).toBe(true)
      );
    });
  });

});
