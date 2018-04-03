import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../utils';
import omit = require('lodash/omit');
import InputChildren from 'react-input-children';
import { ObjectOverwrite } from 'typelevel-ts';
import { Icon } from '../Icon/Icon';
import View from 'react-flexview';

export type InputStatus = 'success' | 'failure';
const InputStatusT = t.enums.of(['success', 'failure']);

export type InputRequiredProps = ObjectOverwrite<InputChildren.Props, {
  /** value */
  value: string,
  /** onChange */
  onChange: (value: string) => void,
  /** input children */
  children?: React.ReactNode,
  /** optional input status */
  status?: InputStatus,
  /** don't use this. Use `innerRef` instead */
  ref?: never
}>;

export type InputDefaultProps = {
  /** true if disabled */
  disabled: boolean
};

export namespace Input {
  export type Props = InputRequiredProps & Partial<InputDefaultProps>;
}
type InputDefaultedProps = InputRequiredProps & InputDefaultProps;

export const Props = {
  value: t.String,
  onChange: t.Function,
  placeholder: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object),
  children: t.maybe(ReactChildren),
  status: t.maybe(InputStatusT)
};

@props(Props, { strict: false })
export class Input extends React.PureComponent<Input.Props> {

  static defaultProps: InputDefaultProps = {
    disabled: false
  };

  _onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => this.props.onChange(value);

  render() {
    const {
      className,
      value,
      status,
      wrapper = {},
      ...props
    } = this.props as InputDefaultedProps;
    const {
      _onChange: onChange
    } = this;

    const isSuccess = status === 'success';
    const isFailure = status === 'failure';
    const children = this.props.children || (
      isSuccess ? <View vAlignContent='center'><Icon icon='check-circle' /></View> :
      isFailure ? <View vAlignContent='center'><Icon icon='times-circle' /></View> :
      undefined
    );

    const inputProps = {
      ...omit(props, ['onChange', 'status', 'children', 'wrapper']),
      children,
      value,
      onChange,
      wrapper: {
        ...wrapper,
        className: cx('input', {
          'has-value': value !== '',
          'is-success': isSuccess,
          'is-failure': isFailure
        }, wrapper.className, className)
      }
    };

    return <InputChildren {...inputProps} />;
  }

}
