import * as React from "react";
import Select, { components } from "react-select";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";

export namespace Dropdown {
  export type Props<OptionType> = SelectNS.Props<OptionType> & { size: "medium" | "small", flat: boolean };
}

const defaultComponents: Dropdown.Props<any>["components"] = {
  Placeholder: ({ children }) => (
    <div className="dropdown__placeholder">{children}</div>
  ),
  IndicatorSeparator: () => null,
  Option: props => (
    <components.Option
      {...props}
      className={cx({
        "is-disabled": props.isDisabled,
        "is-focused": props.isFocused,
        "is-selected": props.isSelected
      })}
    />
  ),
  DropdownIndicator: props => (
    <span className="dropdown__select-arrow-zone">
      <span
        className={
          props.selectProps.menuIsOpen
            ? "dropdown__select-arrow-up"
            : "dropdown__select-arrow-down"
        }
      />
    </span>
  ),
  MultiValueLabel: ({ children }) => (
    <div className="dropdown__multi-value-label">{children}</div>
  ),
  MultiValueRemove: props => (
    <components.MultiValueRemove
      innerProps={{
        ...props.innerProps,
        className: "dropdown__multi-value-remove"
      }}
    >
      ×
    </components.MultiValueRemove>
  ),
  ClearIndicator: props => (
    <span onClick={props.clearValue} className="dropdown__clear-indicator">
      ×
    </span>
  )
};

export class Dropdown<OptionType> extends React.Component<
  Dropdown.Props<OptionType>
> {
  static defaultProps: Dropdown.Props<any> = {
    delimiter: ",",
    size: "medium",
    isDisabled: false,
    isSearchable: false,
    isClearable: false,
    isMulti: false,
    flat: false,
    blurInputOnSelect: true,
    menuPlacement: "bottom",
    components: {}
  };

  getCustomClassNames() {
    const {
      size,
      flat,
      isClearable,
      isMulti,
      isDisabled
    } = this.props;
    return cx({
      "is-medium": size === "medium",
      "is-small": size === "small",
      "is-flat": flat,
      "is-multi": isMulti,
      "is-clearable": isClearable,
      "is-disabled": isDisabled
    });
  }

  private select: Select<OptionType> | null;

  focus = () => {
    this.select && this.select.focus();
  };

  render() {
    const {
      props: { className, components: customComponents, ...props }
    } = this;

    return (
      <Select
        {...props}
        classNamePrefix="dropdown"
        components={{
          ...defaultComponents,
          ...customComponents
        }}
        className={cx("dropdown", className, this.getCustomClassNames())}
        ref={select => {
          this.select = select;
        }}
      />
    );
  }
}
