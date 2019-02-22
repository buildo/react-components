import * as React from "react";
import Select from "react-select";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";
import { ObjectOmit } from "src/utils";

export namespace Dropdown {
  export type Props<OptionType> = ObjectOmit<
    SelectNS.Props<OptionType>,
    "isMulti" | "isClearable" | "onChange" | "value"
  > & {
    size?: "medium" | "small";
    flat?: boolean;
    innerRef?: (ref: Select<OptionType> | null) => void;
  } & (
      | {
          type: "multi" | "multi-clearable";
          value: OptionType[];
          onChange: (value: OptionType[]) => void;
        }
      | {
          type: "single";
          value: OptionType | null;
          onChange: (value: OptionType) => void;
        }
      | {
          type: "single-clearable";
          value: OptionType | null;
          onChange: (value: OptionType | null) => void;
        });
}

export class Dropdown<OptionType> extends React.Component<
  Dropdown.Props<OptionType>
> {
  static defaultProps: Partial<Dropdown.Props<{}>> = {
    delimiter: ",",
    size: "medium",
    isDisabled: false,
    isSearchable: false,
    flat: false,
    blurInputOnSelect: true,
    menuPlacement: "bottom",
    components: {}
  };

  defaultComponents: Dropdown.Props<OptionType>["components"] = {
    IndicatorSeparator: () => null
  };

  getCustomClassNames() {
    const { size, flat, isSearchable } = this.props;
    return cx({
      "is-medium": size === "medium",
      "is-small": size === "small",
      "is-flat": flat,
      "is-multi": this.isMulti(),
      "is-searchable": isSearchable
    });
  }

  isMulti = (): boolean => {
    switch (this.props.type) {
      case "multi":
      case "multi-clearable":
        return true;
      case "single":
      case "single-clearable":
        return false;
    }
  };

  isClearable = (): boolean => {
    switch (this.props.type) {
      case "single-clearable":
      case "multi-clearable":
        return true;
      case "single":
      case "multi":
        return false;
    }
  };

  render() {
    const {
      props: {
        className,
        components: customComponents,
        innerRef,
        type,
        ...props
      }
    } = this;

    return (
      <Select
        {...props}
        classNamePrefix="dropdown"
        components={{
          ...this.defaultComponents,
          ...customComponents
        }}
        className={cx("dropdown", className, this.getCustomClassNames())}
        ref={innerRef}
        isMulti={this.isMulti()}
        isClearable={this.isClearable()}
      />
    );
  }
}
