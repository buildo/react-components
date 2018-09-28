import * as React from 'react';
import { props, t, ReactChild } from '../utils';
import * as cx from 'classnames';
import View from 'react-flexview';
import TextArea from '../TextArea';
import { FormField } from './FormField';

export namespace TextareaField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string,
    /** whether the field is required */
    required?: boolean,
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props,
    /** An optional custom renderer for Textarea */
    textareaRenderer?: (props: TextArea.Props) => JSX.Element,
    /** an optional class name to pass to top level element of the component */
    className?: string,
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties,
    /** an optional id passed to the input component */
    id?: string
  } & TextArea.Props;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  textareaRenderer: t.maybe(t.Function)
}

@props(Props, { strict: false })
export class TextareaField extends React.PureComponent<TextareaField.Props> {
  render() {
    const { label, required, className: _className, id, viewProps, disabled, textareaRenderer, ..._textareaProps } = this.props;
    const className = cx('textarea-field', _className);
    const textareaProps = {
      ..._textareaProps,
      disabled,
      id
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        fieldId={id}
        viewProps={viewProps}
        disabled={disabled}
      >
        {textareaRenderer ?
          textareaRenderer(textareaProps) :
          <TextArea {...textareaProps} />
        }
      </FormField>
    );
  }
}
