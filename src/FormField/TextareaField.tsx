import * as React from "react";
import { props, t, ReactChild, ObjectOmit } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import Textarea from "../Textarea";
import { FormField } from "./FormField";

export namespace TextareaField {
  type FieldProps = {
    /** the label for the field */
    label: JSX.Element | string;
    /** whether the field is required */
    required?: boolean;
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props;
    /** An optional custom renderer for Textarea */
    textareaRenderer?: (props: Textarea.Props) => JSX.Element;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
  };

  export type Props = FieldProps & ObjectOmit<Textarea.Props, keyof FieldProps>;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  textareaRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class TextareaField extends React.PureComponent<TextareaField.Props> {
  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      disabled,
      textareaRenderer,
      ..._textareaProps
    } = this.props;
    const className = cx("textarea-field", _className);
    const textareaProps = {
      ..._textareaProps,
      disabled
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={disabled}
      >
        {textareaRenderer ? (
          textareaRenderer(textareaProps)
        ) : (
          <Textarea {...textareaProps} />
        )}
      </FormField>
    );
  }
}
