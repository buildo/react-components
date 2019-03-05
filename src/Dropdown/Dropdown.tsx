import * as React from "react";
import Select from "react-select";
import Creatable from "react-select/lib/Creatable";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";
import { ObjectOmit } from "../utils";
import { CreatableProps, Props } from "react-select/lib/Creatable";

type DefaultProps = {
  delimiter: NonNullable<SelectNS.Props["delimiter"]>;
  size: "medium" | "small";
  isSearchable: NonNullable<SelectNS.Props["isSearchable"]>;
  menuPlacement: NonNullable<SelectNS.Props["menuPlacement"]>;
};

type NonDefaultProps<OptionType> = ObjectOmit<
  SelectNS.Props<OptionType>,
  "isMulti" | "isClearable" | "onChange" | "value"
> & {
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
      }) &
  (
    | ({
        allowCreate: true;
        isSearchable?: never;
      } & CreatableProps<OptionType>)
    | {
        allowCreate?: never;
      });

type InternalProps<OptionType> = DefaultProps & NonDefaultProps<OptionType>;

export class Dropdown<OptionType> extends React.Component<
  InternalProps<OptionType>
> {
  static defaultProps: DefaultProps = {
    delimiter: ",",
    size: "medium",
    isSearchable: false,
    menuPlacement: "bottom"
  };

  defaultComponents: InternalProps<OptionType>["components"] = {
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
        allowCreate,
        ...props
      }
    } = this;

    const Component: React.ComponentType<Props<OptionType>> = allowCreate
      ? Creatable
      : Select;

    return (
      <Component
        styles={{
          input: () => ({ margin: 0, padding: 0 })
        }}
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
        isSearchable={allowCreate || props.isSearchable}
      />
    );
  }
}

export namespace Dropdown {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps>;
}
