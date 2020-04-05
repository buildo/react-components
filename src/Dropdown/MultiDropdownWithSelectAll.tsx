import * as React from "react";
import Select, { components } from "react-select";

import Creatable from "react-select/lib/Creatable";
import { Props } from "react-select/lib/Creatable";
import * as cx from "classnames";
import {
  CommonProps,
  defaultProps,
  defaultComponents,
  defaultStyle,
  getCommonClassnames,
  DefaultProps
} from "./commons";
import { GroupType, ValueType } from "react-select/lib/types";
import { ValueContainerProps } from "react-select/lib/components/containers";

export function allSelected<OptionType = never>(): SelectAllValue<OptionType> {
  return { type: "AllSelected" };
}

export function someSelected<OptionType>(
  values: OptionType[]
): SelectAllValue<OptionType> {
  return { type: "SomeSelected", values };
}

type SelectAllOptionType = { value: "_ALL"; label: string };
export type SelectAllValue<OptionType> =
  | {
      type: "AllSelected";
    }
  | {
      type: "SomeSelected";
      values: OptionType[];
    };

type NonDefaultProps<OptionType> = CommonProps<
  OptionType | SelectAllOptionType
> & {
  selectAllLabel: string;
  value: SelectAllValue<OptionType>;
  onChange: (value: SelectAllValue<OptionType>) => void;
  options: CommonProps<OptionType>["options"];
};

export namespace MultiDropdownWithSelectAll {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps>;
}

function isGroupedOptionsArray<OptionType>(
  options: MultiDropdownWithSelectAll.Props<OptionType>["options"]
): options is Array<GroupType<OptionType>> {
  return options.length > 0 && (options[0] as any).hasOwnProperty("options");
}

export class MultiDropdownWithSelectAll<OptionType> extends React.PureComponent<
  NonDefaultProps<OptionType> & DefaultProps
> {
  static defaultProps = defaultProps;

  selectAllOption: SelectAllOptionType = {
    value: "_ALL",
    label: this.props.selectAllLabel
  };

  // if this component is defined inside the render method, the search input will lose focus
  // every time the component is re-rendered (e.g. every time we set new async options)
  valueContainer = (
    valueContainerProps: ValueContainerProps<OptionType | SelectAllOptionType>
  ) => {
    if (this.props.value && this.props.value.type === "AllSelected") {
      const { children, ...otherProps } = valueContainerProps;
      const childrenWithoutValues = React.Children.toArray(children).filter(
        c => !!c && (c as any).type.name !== "MultiValue"
      );
      return (
        <components.ValueContainer {...otherProps}>
          {!valueContainerProps.selectProps.inputValue && ( // hide the 'All' value if the user is searching for something
            <components.SingleValue
              {...otherProps}
              data={this.selectAllOption}
              innerProps={{}}
              isDisabled={false}
            >
              {this.selectAllOption.label}
            </components.SingleValue>
          )}
          {childrenWithoutValues}
        </components.ValueContainer>
      );
    } else {
      return <components.ValueContainer {...valueContainerProps} />;
    }
  };

  injectSelectAllOptions = (
    options: MultiDropdownWithSelectAll.Props<OptionType>["options"]
  ):
    | Array<OptionType | SelectAllOptionType>
    | Array<GroupType<OptionType | SelectAllOptionType>> => {
    if (isGroupedOptionsArray(options)) {
      return [{ options: [this.selectAllOption] }, ...options];
    } else {
      return [this.selectAllOption, ...options] as Array<
        OptionType | SelectAllOptionType
      >;
    }
  };

  onChange = (value: ValueType<SelectAllOptionType | OptionType>) => {
    const valueArray: (OptionType | SelectAllOptionType)[] =
      value && Array.isArray(value) ? value : [];

    if (
      valueArray.length > 0 &&
      valueArray[valueArray.length - 1] == this.selectAllOption
    ) {
      this.props.onChange({ type: "AllSelected" });
    } else {
      this.props.onChange({
        type: "SomeSelected",
        values: valueArray.filter(
          a => a !== this.selectAllOption
        ) as OptionType[]
      });
    }
  };

  render() {
    const {
      props: {
        className,
        components: customComponents,
        allowCreate,
        size,
        flat,
        options: _options,
        innerRef,
        value: selectAllValue,
        ...props
      }
    } = this;

    const Component: React.ComponentType<Props<
      OptionType | SelectAllOptionType
    >> = allowCreate ? Creatable : Select;

    const dropdownValue = selectAllValue
      ? selectAllValue.type === "AllSelected"
        ? this.selectAllOption
        : selectAllValue.values
      : [];

    return (
      <Component
        classNamePrefix="dropdown"
        className={cx(
          getCommonClassnames(size, flat || false, props.isSearchable),
          "is-multi",
          className
        )}
        styles={defaultStyle}
        {...props}
        value={dropdownValue}
        onChange={this.onChange}
        options={this.injectSelectAllOptions(_options)}
        components={{
          ...defaultComponents<OptionType | SelectAllOptionType>(),
          ValueContainer: this.valueContainer,
          ...customComponents
        }}
        ref={innerRef}
        isSearchable={allowCreate || props.isSearchable}
        isMulti
      />
    );
  }
}
