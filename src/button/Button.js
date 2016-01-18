import React from 'react';
import cx from 'classnames';
import pick from 'lodash/object/pick';
import { pure, skinnable, props, t } from '../utils';
import ButtonLogic, { buttonState, buttonBaseState } from './ButtonLogic';
import ButtonRenderer/*, { stringForButtonStates } */ from './ButtonRenderer';

import './button.scss';

// util
const notBoth = (a, b) => !(a && b);

const ButtonProps = t.subtype(t.struct({
  baseState: t.maybe(buttonBaseState),
  // `baseState` is overridden by `buttonState`
  buttonState: t.maybe(buttonState),
  onClick: t.Func,
  stableSuccess: t.maybe(t.Bool),
  timerMillis: t.maybe(t.Num),
  label: t.maybe(t.union([t.Str, t.Obj])),//t.maybe(t.union([t.Str, stringForButtonStates])), https://github.com/buildo/labonline/issues/544
  icon: t.maybe(t.union([t.Str, t.Obj])),//t.maybe(t.union([t.Str, stringForButtonStates])), https://github.com/buildo/labonline/issues/544
  children: t.maybe(t.ReactNode),
  style: t.maybe(t.Obj),
  className: t.maybe(t.Str),
  primary: t.maybe(t.Bool),
  size: t.enums.of(['tiny', 'small', 'large']),
  textOverflow: t.maybe(t.Function)
}), ({ label, children }) => notBoth(label, children), 'ButtonProps');

const defaultProps = {
  primary: false,
  size: 'small',
  baseState: 'ready',
  stableSuccess: false,
  timerMillis: 2000,
  icon: '',
  className: '',
  style: {}
};

@pure
@skinnable()
@props(ButtonProps)
export default class Button extends React.Component {

  static defaultProps = defaultProps

  getLocals() {

    const defaultLabels = {
      success: 'success',
      error: 'error',
      processing: 'processing'
    };

    const defaultIcons = {
      success: 'validate',
      error: 'exclamation'
    };

    const makeProp = x => ( typeof x === 'string' ? { ready: x, 'not-allowed': x } : x );

    const label = {
      ...defaultLabels,
      ...makeProp(this.props.label || this.props.children)
    };

    const icon = {
      ...defaultIcons,
      ...makeProp(this.props.icon)
    };

    const buttonLogicProps = pick(this.props, ['baseState', 'buttonState', 'onClick', 'stableSuccess', 'timerMillis']);


    const buttonRendererProps = {
      style: this.props.style,
      className: cx({
        primary: this.props.primary,
        [this.props.size]: true
      }, this.props.className),
      textOverflow: this.props.textOverflow,
      label,
      icon
    };

    return {
      buttonLogicProps,
      buttonRendererProps
    };
  }

  template({ buttonLogicProps, buttonRendererProps }) {
    return (
      <ButtonLogic {...buttonLogicProps}>
        {(props) => <ButtonRenderer {...props} {...buttonRendererProps} />}
      </ButtonLogic>
    );
  }

}
