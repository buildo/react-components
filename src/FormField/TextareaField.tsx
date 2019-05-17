import * as React from "react";
import { ObjectOmit } from "../utils";
import * as cx from "classnames";
import Textarea from "../Textarea";
import { FormField } from "./FormField";

type DefaultProps = {
  /** An optional custom renderer for Textarea */
  textareaRenderer: (props: Textarea.Props) => JSX.Element;
};

type FieldProps = {
  /** the label for the field */
  label: FormField.Props["label"];
  /** whether the field is required */
  required?: FormField.Props["required"];
  /** an optional hint describing what's the expected value for the field (e.g. sample value or short description) */
  hint?: FormField.Props["hint"];
  /** optional props to pass to the wrapping View */
  viewProps?: FormField.Props["viewProps"];
  /** an optional class name to pass to top level element of the component */
  className?: string;
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties;
};

type NonDefaultProps = FieldProps &
  ObjectOmit<Textarea.Props, keyof FieldProps>;
type InternalProps = NonDefaultProps & DefaultProps;

export namespace TextareaField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class TextareaField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    textareaRenderer: props => <Textarea {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      disabled,
      hint,
      textareaRenderer,
      ..._textareaProps
    } = this.props;
    const className = cx("textarea-field", _className);
    const textareaProps: Textarea.Props = {
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
        hint={hint}
        render={(onFocus, onBlur) =>
          textareaRenderer({ ...textareaProps, onFocus, onBlur })
        }
      />
    );
  }
}
