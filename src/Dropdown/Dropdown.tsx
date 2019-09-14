import * as React from "react";
import Select from "react-select";
import Creatable from "react-select/lib/Creatable";
import * as SelectNS from "react-select/lib/Select";
import * as cx from "classnames";
import { ObjectOmit } from "../utils";
import { CreatableProps, Props } from "react-select/lib/Creatable";
import { GroupType } from "react-select/lib/types";
import View from "react-flexview";

type DefaultProps = {
  delimiter: NonNullable<SelectNS.Props["delimiter"]>;
  size: "medium" | "small";
  isSearchable: NonNullable<SelectNS.Props["isSearchable"]>;
  menuPlacement: NonNullable<SelectNS.Props["menuPlacement"]>;
};

type SelectAllProps =
  | {
      showSelectAll: true;
      selectAllLabel: string; //TODO: this can became a string | JSX.Element for further customization
    }
  | {
      showSelectAll?: false;
    };

type NonDefaultProps<OptionType> = ObjectOmit<
  SelectNS.Props<OptionType>,
  "isMulti" | "isClearable" | "onChange" | "value"
> & {
  flat?: boolean;
  innerRef?: (ref: Select<OptionType> | null) => void;
} & SelectAllProps &
  (
    | {
        type: "multi" | "multi-clearable";
        value: OptionType[];
        onChange: (value: OptionType[] | "all") => void;
      }
    | {
        type: "single";
        value: OptionType | null;
        onChange: (value: OptionType | "all") => void;
      }
    | {
        type: "single-clearable";
        value: OptionType | null;
        onChange: (value: OptionType | "all" | null) => void;
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

  concatUnion<A, B>(a: Array<A>, b: Array<B>): Array<A | B> {
    return (a as Array<A | B>).concat(b);
  }

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

    const Component: React.ComponentType<
      Props<OptionType | "all">
    > = allowCreate ? Creatable : Select;

    const allOptionArray: Array<"all"> = ["all"];

    const injectSelectAllOptions = (
      options:
        | GroupType<OptionType | "all">[]
        | (OptionType | "all")[]
        | undefined
    ) => {
      if (options === undefined || options.length === 0) return undefined;
      else if (options["options"] !== undefined)
        return this.concatUnion(
          [{ options: allOptionArray }],
          options as GroupType<OptionType | "all">[]
        );
      else
        return this.concatUnion(allOptionArray, options as (
          | OptionType
          | "all")[]);
    };

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
        options={
          this.props.showSelectAll
            ? injectSelectAllOptions(this.props.options)
            : this.props.options
        }
        formatOptionLabel={(option, labelMeta) => {
          if (option === "all")
            return (
              this.props.showSelectAll && (
                <View>{this.props.selectAllLabel}</View>
              )
            );
          else if (!this.props.formatOptionLabel) return option["label"];
          else
            this.props.formatOptionLabel(
              option,
              labelMeta as SelectNS.FormatOptionLabelMeta<OptionType>
            );
        }}
      />
    );
  }
}

export namespace Dropdown {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps>;
}
