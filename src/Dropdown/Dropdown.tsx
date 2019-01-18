import * as React from "react";
import { props, t, ReactElement } from "../utils";
import Select from "react-select";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";

function isEmptyArray(x: any): x is any[] {
  return t.Array.is(x) && x.length === 0;
}

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
    const { size, flat, isClearable, menuPosition } = this.props;
    return cx({
      "is-medium": size === "medium",
      "is-small": size === "small",
      "is-flat": flat,
      "is-clearable": isClearable,
      "menu-position-top": menuPosition === "top"
    });
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      if (isEmptyArray(this.props.options)) {
        e.preventDefault();
      }
    }
  };

  private select: Select<OptionType> | null;

  focus = () => {
    this.select && this.select.focus();
  };

  render() {
    const {
      onKeyDown,
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
        className={cx("dropdown", className, this.getCustomClassNames())}
        onKeyDown={onKeyDown}
        ref={select => {
          this.select = select;
        }}
      />
    );
  }
}
