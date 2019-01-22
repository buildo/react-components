import * as React from "react";
import { props, t, ReactElement } from "../utils";
import Select, { components } from "react-select";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";

export namespace Dropdown {
  export type MenuPosition = "top" | "bottom";

  export type Props<OptionType> = Pick<
    SelectNS.Props<OptionType>,
    Exclude<keyof SelectNS.Props, "menuPosition">
  > & { menuPosition: MenuPosition; size: "medium" | "small"; flat: boolean };
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
  style: t.maybe(t.Object)
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
    menuPosition: "bottom"
  };

  getCustomClassNames() {
    const { size, flat, isClearable, menuPosition, isMulti } = this.props;
    return cx({
      "is-medium": size === "medium",
      "is-small": size === "small",
      "is-flat": flat,
      "is-multi": isMulti,
      "is-clearable": isClearable,
      "menu-position-top": menuPosition === "top"
    });
  }

  private select: Select<OptionType> | null;

  focus = () => {
    this.select && this.select.focus();
  };

  render() {
    const {
      props: {
        className,
        backspaceRemovesValue,
        isClearable,
        menuPosition,
        ...props
      }
    } = this;

    return (
      <Select
        {...props}
        isClearable={isClearable}
        backspaceRemovesValue={
          t.Nil.is(backspaceRemovesValue) ? isClearable : backspaceRemovesValue
        }
        components={{
          Menu: props => (
            <components.Menu {...props} className="Select-menu-outer" />
          ),
          Control: props => (
            <components.Control
              {...props}
              className={cx("Select-control", {
                "is-focused": props.isFocused,
                "is-open": props.selectProps.menuIsOpen
              })}
            />
          ),
          Group: props => (
            <components.Group {...props} className="Select-option-group" />
          ),
          Input: props => (
            <components.Input {...props} className="Select-input" />
          ),
          Placeholder: props => <div className="Select-placeholder" />,
          IndicatorSeparator: () => null,
          Option: props => (
            <components.Option
              {...props}
              className={cx(
                "Select-option",
                cx({
                  "is-disabled": props.isDisabled,
                  "is-focused": props.isFocused,
                  "is-selected": props.isSelected
                })
              )}
            />
          ),
          DropdownIndicator: props => (
            <span className="Select-arrow-zone">
              <span
                className={
                  props.selectProps.menuIsOpen
                    ? "Select-arrow-up"
                    : "Select-arrow-down"
                }
              />
            </span>
          ),
          SingleValue: props => (
            <components.SingleValue {...props} className="Single-value" />
          ),
          MultiValue: props => (
            <components.MultiValue {...props} className="Multi-value" />
          ),
          MultiValueLabel: () => <div className="Multi-value-label" />,
          MultiValueRemove: props => (
            <components.MultiValueRemove
              innerProps={{
                ...props.innerProps,
                className: "Multi-value-remove"
              }}
            >
              ×
            </components.MultiValueRemove>
          ),
          ClearIndicator: props => (
            <span onClick={props.clearValue} className="Clear-indicator">
              ×
            </span>
          )
        }}
        className={cx("buildo-dropdown", className, this.getCustomClassNames())}
        ref={select => {
          this.select = select;
        }}
      />
    );
  }
}
