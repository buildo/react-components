import * as React from 'react';
import { ObjectOverwrite } from '../utils';
import TextareaAutosize from 'react-autosize-textarea';

export type TextareaRequiredProps = ObjectOverwrite<
  TextareaAutosize.Props,
  {
    /** value */
    value: string;
    /** onChange */
    onChange: (value: string) => void;
    /** don't use this. Use `innerRef` instead */
    ref?: never;
  }
>;

export type TextareaDefaultProps = {
  /** true if disabled */
  disabled: boolean;
};

export namespace Textarea {
  export type Props = TextareaRequiredProps & Partial<TextareaDefaultProps>;
}

export class Textarea extends React.PureComponent<Textarea.Props> {
  static defaultProps: TextareaDefaultProps = {
    disabled: false
  };

  _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) =>
    this.props.onChange(value);

  render() {
    const textareaProps = {
      ...this.props,
      onChange: this._onChange
    };

    return <TextareaAutosize {...textareaProps} />;
  }
}
