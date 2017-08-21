import React from 'react';
import { mount } from 'enzyme';

import StatefulButton from '../../src/Button/StatefulButton';
import clone from 'lodash.clone';

function timeoutPromise(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

const exampleProps = {
  ...StatefulButton.defaultProps,
  label: 'BeautifulButton',
  onClick: timeoutPromise.bind(this, 5),
  baseState: 'ready',
  stableSuccess: false,
  timerMillis: 5
};

function mkComponent(overrides) {
  const component = new StatefulButton({
    ...exampleProps,
    label: overrides.children ? undefined : 'BeautifulButton',
    ...overrides
  });
  component.setState = (state, cb) => {
    component.state = state;
    cb && cb();
  };
  return component;
}

describe('StatefulButton', () => {

  it('renders correctly', () => {
    const component = mount(
      <StatefulButton {...exampleProps} />
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('behaves correctly in base state', () => {
    const component = mkComponent({
      stableSuccess: false
    });
    const locals = component.getLocals();
    expect(locals.buttonState).toBe('ready');
    expect(locals.label).toBe('BeautifulButton');
  });

  it('passes through state if provided as prop', () => {
    const component = mkComponent({
      children: <button />,
      buttonState: 'error'
    });
    const locals = component.getLocals();
    expect(locals.buttonState).toBe('error');
    expect(locals.children).toBeDefined();
    expect(locals.label).toBe(undefined);
  });

  describe('with unstable success state', () => {
    it('switches to processing, success, ready on click', () => {
      const component = mkComponent({
        stableSuccess: false
      });
      component.componentDidMount();
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      return timeoutPromise(6).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
        return timeoutPromise(5);
      }).then(() =>
        expect(component.getLocals().buttonState).toBe('ready')
      );
    });
  });

  describe('with stable success state', () => {
    it('switches to processing, success and stop there, on click', () => {
      const component = mkComponent({
        stableSuccess: true
      });
      component.componentDidMount();
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      return timeoutPromise(6).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
        return timeoutPromise(5);
      }).then(() =>
        expect(component.getLocals().buttonState).toBe('success')
      );
    });

    it('switches to processing, success and back to baseState when baseState is changed after click', () => {
      const component = mkComponent({
        stableSuccess: true
      });
      component.componentDidMount();
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      const newProps = clone(component.props);
      newProps.baseState = 'not-allowed';
      component.componentWillReceiveProps(newProps);
      component.props = newProps;
      return timeoutPromise(7).then(() =>
        expect(component.getLocals().buttonState).toBe('not-allowed')
      );
    });
  });

});
