import * as React from "react";
import { props, t, ReactChild } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import Checkbox from "../Checkbox";
import { FormField } from "./FormField";

type DefaultProps = {
  /** an optional custom renderer for Checkbox */
  checkboxRenderer: (props: Checkbox.Props) => JSX.Element;
};

type NonDefaultProps = {
  /** the label for the field */
  label: JSX.Element | string;
  /** whether the field is required */
  required?: boolean;
  /** optional props to pass to the wrapping View */
  viewProps?: View.Props;
  /** an optional class name to pass to top level element of the component */
  className?: string;
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties;
  /** an optional id passed to the input component */
  id?: string;
} & Checkbox.Props;

type InternalProps = DefaultProps & NonDefaultProps;

export namespace CheckboxField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  checkboxRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class CheckboxField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    checkboxRenderer: props => <Checkbox {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      id,
      viewProps,
      disabled,
      checkboxRenderer,
      ..._checkboxProps
    } = this.props;
    const className = cx("checkbox-field", _className);
    const checkboxProps = {
      ..._checkboxProps,
      disabled
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={disabled}
        id={id}
        horizontal
        onLabelClick={() => checkboxProps.onChange(!checkboxProps.value)}
        render={(onFocus, onBlur) =>
          checkboxRenderer({ ...checkboxProps, onFocus, onBlur })
        }
      />
    );
  }
}
