import * as React from "react";
import * as cx from "classnames";
import { MultiDropdown as Dropdown } from "../Dropdown";
import { FormField } from "./FormField";

type DefaultProps<OptionType> = {
  /** An optional custom renderer for Dropdown */
  dropdownRenderer: (props: Dropdown.Props<OptionType>) => JSX.Element;
};

type NonDefaultProps<OptionType> = {
  /** the label for the field */
  label: FormField.Props["label"];
  /** whether the field is required */
  required?: FormField.Props["required"];
  /** optional props to pass to the wrapping View */
  viewProps?: FormField.Props["viewProps"];
  /** an optional hint describing what's the expected value for the field (e.g. sample value or short description) */
  hint?: FormField.Props["hint"];
  /** an optional class name to pass to top level element of the component */
  className?: string;
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties;
  /** an optional id passed to the dropdown component */
  id?: string;
  /** the properties of the dropwdown */
  dropdownProps: Dropdown.Props<OptionType>;
};

type InternalProps<OptionType> = NonDefaultProps<OptionType> &
  DefaultProps<OptionType>;

export namespace MultiDropdownField {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps<OptionType>>;
}

export class MultiDropdownField<OptionType> extends React.PureComponent<
  InternalProps<OptionType>
> {
  static defaultProps: DefaultProps<unknown> = {
    dropdownRenderer: (props) => <Dropdown {...props} />,
  };

  render() {
    const {
      label,
      required,
      className,
      viewProps,
      hint,
      dropdownRenderer,
      dropdownProps
    } = this.props;

    return (
      <FormField
        label={label}
        required={required}
        className={cx("dropdown-field", className)}
        viewProps={viewProps}
        disabled={dropdownProps.isDisabled}
        hint={hint}
        render={(onFocus, onBlur) =>
          dropdownRenderer({ ...dropdownProps, onFocus, onBlur })
        }
      />
    );
  }
}
