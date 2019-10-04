import * as React from "react";
import * as cx from "classnames";
import { SingleDropdown as Dropdown } from "../Dropdown";
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
} & Dropdown.Props<OptionType>;

type InternalProps<OptionType> = NonDefaultProps<OptionType> &
  DefaultProps<OptionType>;

export namespace SingleDropdownField {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps<OptionType>>;
}

export class SingleDropdownField<OptionType> extends React.PureComponent<
  InternalProps<OptionType>
> {
  static defaultProps: DefaultProps<unknown> = {
    dropdownRenderer: props => <Dropdown {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      isDisabled,
      hint,
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
        hint={hint}
        render={(onFocus, onBlur) =>
          dropdownRenderer({ ...dropdownProps, onFocus, onBlur })
        }
      />
    );
  }
}
