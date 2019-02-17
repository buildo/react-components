import * as React from "react";
import Select from "react-select";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";

export namespace Dropdown {
  export type Props<OptionType> = SelectNS.Props<OptionType> & {
    size: "medium" | "small";
    flat: boolean;
    innerRef?: (ref: Select<OptionType> | null) => void;
  };
}

const defaultComponents: Dropdown.Props<any>["components"] = {
  IndicatorSeparator: () => null
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
    const { size, flat, isMulti, isSearchable } = this.props;
    return cx({
      "is-medium": size === "medium",
      "is-small": size === "small",
      "is-flat": flat,
      "is-multi": isMulti,
      "is-searchable": isSearchable
    });
  }

  render() {
    const {
      props: { className, components: customComponents, innerRef, ...props }
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
        ref={innerRef}
      />
    );
  }
}
