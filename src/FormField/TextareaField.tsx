import * as React from "react";
import * as cx from "classnames";
import Textarea from "../Textarea";
import { FormField } from "./FormField";

type DefaultProps = {
  /** An optional custom renderer for Textarea */
  textareaRenderer: (props: Textarea.Props) => JSX.Element;
};

type NonDefaultProps = {
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
  /** the properties of the text area */
  textareaProps: Textarea.Props;
};

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
      className,
      viewProps,
      hint,
      textareaRenderer,
      textareaProps
    } = this.props;
    return (
      <FormField
        label={label}
        required={required}
        className={cx("textarea-field", className)}
        viewProps={viewProps}
        disabled={textareaProps.disabled}
        hint={hint}
        render={(onFocus, onBlur) =>
          textareaRenderer({ ...textareaProps, onFocus, onBlur })
        }
      />
    );
  }
}
