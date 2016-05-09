import React from 'react';
import expect from 'expect';
import StatefulButton from '../../../src/button/StatefulButton';
import clone from 'lodash/clone';

describe('StatefulButton', () => {

  function timeoutPromise(millis) {
    return new Promise((resolve) => {
      setTimeout(resolve, millis);
    });
  }

  function mkComponent(overrides) {
    const component = new StatefulButton({
      label: overrides.children ? undefined : 'BeautifulButton',
      onClick: timeoutPromise.bind(this, 5),
      baseState: 'ready',
      stableSuccess: false,
      timerMillis: 5,
      ...overrides
    });
    component.setState = (state, cb) => {
      component.state = state;
      cb && cb();
    };
    return component;
  }

  it('should behave correctly in base state', () => {
    const component = mkComponent({
      stableSuccess: false
    });
    const locals = component.getLocals();
    expect(locals.buttonState).toBe('ready');
    expect(locals.label).toBe('BeautifulButton');
  });

  it('should pass through state if provided as prop', () => {
    const component = mkComponent({
      children: <button />,
      buttonState: 'error'
    });
    const locals = component.getLocals();
    expect(locals.buttonState).toBe('error');
    expect(locals.children).toExist();
    expect(locals.label).toBe(undefined);
  });

  describe('with unstable success state', () => {
    it('should switch to processing, success, ready on click', () => {
      const component = mkComponent({
        stableSuccess: false
      });
      component.componentDidMount();
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      return timeoutPromise(6).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
        return timeoutPromise(5);
      }).then(() => {
        expect(component.getLocals().buttonState).toBe('ready');
      });
    });
  });

  describe('with stable success state', () => {
    it('on click, should switch to processing, success and stop there', () => {
      const component = mkComponent({
        stableSuccess: true
      });
      component.componentDidMount();
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      return timeoutPromise(6).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
        return timeoutPromise(5);
      }).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
      });
    });

    it('on click, should switch to processing, success and back to baseState when baseState is changed after click', () => {
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
      return timeoutPromise(7).then(() => {
        expect(component.getLocals().buttonState).toBe('not-allowed');
      });
    });
  });

});
