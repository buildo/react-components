import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import expect from 'expect';
import ButtonLogic from '../../../src/button/ButtonLogic';
import vdom from 'react-vdom';
import clone from 'lodash/lang/clone';

describe('ButtonLogic', () => {

  function timeoutPromise(millis) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, millis);
    });
  }

  function mkComponent({ stableSuccess, buttonState }) {
    const component = new ButtonLogic({
      children: props => <button {...props} />,
      onClick: timeoutPromise.bind(this, 5),
      baseState: 'ready',
      stableSuccess: stableSuccess || false,
      timerMillis: 5,
      buttonState
    });
    component.setState = (state, cb) => {
      component.state = state;
      cb && cb()
    };
    return component;
  }

  it('should behave correctly in base state', () => {
    const component = mkComponent({
      stableSuccess: false
    });
    const locals = component.getLocals();
    expect(locals.buttonState).toBe('ready');
    expect(locals.child).toExist();
    const dom = vdom(component);
    expect(dom.tag).toBe('button');
    expect(dom.attrs.buttonState).toBe('ready');
  });

  it('should pass through state if provided as prop', () => {
    const component = mkComponent({
      buttonState: 'error'
    });
    const locals = component.getLocals();
    expect(locals.buttonState).toBe('error');
    expect(locals.child).toExist();
    const dom = vdom(component);
    expect(dom.tag).toBe('button');
    expect(dom.attrs.buttonState).toBe('error');
  });

  describe('with unstable success state', () => {
    it('should switch to processing, success, ready on click', () => {
      const component = mkComponent({
        stableSuccess: false
      });
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      expect(vdom(component).attrs.buttonState).toBe('processing');
      return timeoutPromise(6).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
        expect(vdom(component).attrs.buttonState).toBe('success');
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
      component.getLocals().onClick();
      expect(component.getLocals().buttonState).toBe('processing');
      return timeoutPromise(6).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
        expect(vdom(component).attrs.buttonState).toBe('success');
        return timeoutPromise(5);
      }).then(() => {
        expect(component.getLocals().buttonState).toBe('success');
      });
    });

    it('on click, should switch to processing, success and back to baseState when baseState is changed after click', () => {
      const component = mkComponent({
        stableSuccess: true
      });
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
