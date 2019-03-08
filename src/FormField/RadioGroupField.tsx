import * as React from "react";
import { props, t, ReactChild } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import RadioGroup from "../RadioGroup";
import { FormField } from "./FormField";

type DefaultProps = {
  /** an optional custom renderer for RadioGroupField */
  radioGroupRenderer: (props: RadioGroup.Props) => JSX.Element;
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
} & RadioGroup.Props;

type InternalProps = NonDefaultProps & DefaultProps;

export namespace RadioGroupField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  radioGroupRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class RadioGroupField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    radioGroupRenderer: props => (
      <RadioGroup {...props} style={{ marginTop: "16px", ...props.style }} />
    )
  };

  render() {
    const {
      label,
      required,
      className: _className,
      id,
      viewProps,
      disabled,
      radioGroupRenderer,
      ..._radioGroupProps
    } = this.props;
    const className = cx("radio-group-field", _className);
    const radioGroupProps = {
      ..._radioGroupProps,
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
        render={() => radioGroupRenderer({ ...radioGroupProps })}
      />
    );
  }
}
