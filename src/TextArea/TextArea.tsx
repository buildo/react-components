import * as React from 'react';
import { props, t, ObjectOverwrite } from '../utils';
import TextareaAutosize from 'react-autosize-textarea';

export type TextAreaRequiredProps = ObjectOverwrite<TextareaAutosize.Props, {
  /** value */
  value: string,
  /** onChange */
  onChange: (value: string) => void,
  /** don't use this. Use `innerRef` instead */
  ref?: never
}>;

export type TextAreaDefaultProps = {
  /** true if disabled */
  disabled: boolean
};

export namespace TextArea {
  export type Props = TextAreaRequiredProps & Partial<TextAreaDefaultProps>;
}

export const Props = {
  value: t.String,
  onChange: t.Function,
  placeholder: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props, { strict: false })
export class TextArea extends React.PureComponent<TextArea.Props> {

  static defaultProps: TextAreaDefaultProps = {
    disabled: false
  };

  _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => this.props.onChange(value);

  render() {
    const textareaProps = {
      ...this.props,
      onChange: this._onChange
    };

    return <TextareaAutosize {...textareaProps} />;
  }

}
