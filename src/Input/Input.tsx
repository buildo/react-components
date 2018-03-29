import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../utils';
import omit = require('lodash/omit');
import InputChildren from 'react-input-children';

export type InputRequiredProps = {
  /** input placeholder */
  placeholder?: string,
  /** an optional class name to pass to top level element of the component */
  className?: string,
  /** component's id */
  id?: string,
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties,
  /** value */
  value: string,
  /** onChange */
  onChange: (value: string) => void,
  /** input children */
  children?: React.ReactNode
};

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
  children: t.maybe(ReactChildren)
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
      ...props
    } = this.props as InputDefaultedProps;
    const {
      _onChange: onChange
    } = this;

    const inputProps = {
      ...omit(props, 'onChange'),
      value,
      onChange,
      wrapper: {
        className: cx('input', { 'empty-value': value === '' }, className)
      }
    };

    return <InputChildren {...inputProps} />;
  }

}
