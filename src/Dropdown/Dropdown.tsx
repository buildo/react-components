import * as React from "react";
import { props, t, ReactElement, ObjectOmit } from "../utils";
import Select, { components } from "react-select";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";

export namespace Dropdown {
  export type Props<OptionType> = SelectNS.Props<OptionType> & { size: "medium" | "small", flat: boolean };
}

export const Props = {
  value: t.maybe(t.union([t.Object, t.list(t.Object)])),
  onChange: t.maybe(t.Function),
  options: t.list(t.Object),
  size: t.maybe(t.enums.of(["medium", "small"])),
  isDisabled: t.maybe(t.Boolean),
  isSearchable: t.maybe(t.Boolean),
  isClearable: t.maybe(t.Boolean),
  isMulti: t.maybe(t.Boolean),
  flat: t.maybe(t.Boolean),
  blurInputOnSelect: t.maybe(t.Boolean),
  backspaceRemovesValue: t.maybe(t.Boolean),
  menuPosition: t.maybe(t.enums.of(["top", "bottom"])),
  placeholder: t.maybe(t.union([t.String, ReactElement])),
  noOptionsMessage: t.maybe(t.String),
  delimiter: t.maybe(t.String),
  onInputChange: t.maybe(t.Function),
  onFocus: t.maybe(t.Function),
  onBlur: t.maybe(t.Function),
  isLoading: t.maybe(t.Boolean),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  components: t.maybe(t.Object)
};

const defaultComponents: Dropdown.Props<any>["components"] = {
  Placeholder: ({ children }) => (
    <div className="react-select__placeholder">{children}</div>
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
    <span className="react-select__select-arrow-zone">
      <span
        className={
          props.selectProps.menuIsOpen
            ? "react-select__select-arrow-up"
            : "react-select__select-arrow-down"
        }
      />
    </span>
  ),
  MultiValueLabel: ({ children }) => (
    <div className="react-select__multi-value-label">{children}</div>
  ),
  MultiValueRemove: props => (
    <components.MultiValueRemove
      innerProps={{
        ...props.innerProps,
        className: "react-select__multi-value-remove"
      }}
    >
      ×
    </components.MultiValueRemove>
  ),
  ClearIndicator: props => (
    <span onClick={props.clearValue} className="react-select__clear-indicator">
      ×
    </span>
  )
};

@props(Props, { strict: true })
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
        classNamePrefix="react-select"
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
