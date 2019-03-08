import * as React from "react";
import { props, t, ReactChild } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import Dropdown from "../Dropdown";
import { FormField } from "./FormField";

type DefaultProps<OptionType> = {
  /** An optional custom renderer for Dropdown */
  dropdownRenderer: (props: Dropdown.Props<OptionType>) => JSX.Element;
};

type NonDefaultProps<OptionType> = {
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
  /** an optional id passed to the dropdown component */
  id?: string;
} & Dropdown.Props<OptionType>;

type InternalProps<OptionType> = NonDefaultProps<OptionType> &
  DefaultProps<OptionType>;

export namespace DropdownField {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps<OptionType>>;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  dropdownRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class DropdownField<OptionType> extends React.PureComponent<
  InternalProps<OptionType>
> {
  static defaultProps: DefaultProps<any> = {
    dropdownRenderer: props => <Dropdown {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      isDisabled,
      dropdownRenderer,
      id,
      ..._dropdownProps
    } = this.props;
    const className = cx("dropdown-field", _className);

    const dropdownProps = {
      ..._dropdownProps,
      isDisabled,
      id
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={isDisabled}
        render={(onFocus, onBlur) =>
          dropdownRenderer({ ...dropdownProps, onFocus, onBlur })
        }
      />
    );
  }
}
