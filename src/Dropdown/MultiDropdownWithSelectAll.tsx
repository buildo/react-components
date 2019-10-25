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
import { GroupType } from "react-select/lib/types";

type SelectAllOptionType = { value: "_ALL"; label: string };

type NonDefaultProps<OptionType> = CommonProps<
  OptionType | SelectAllOptionType
> & {
  selectAllLabel: string;
  value: OptionType[] | SelectAllOptionType;
  onChange: (value: OptionType[] | SelectAllOptionType) => void;
};

function isAll<OptionType>(
  value?: OptionType | SelectAllOptionType
): value is SelectAllOptionType {
  return value !== undefined && value["value"] === "_ALL";
}

export namespace MultiDropdownWithSelectAll {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps>;
}

function isGroupedOptionsArray<OptionType>(
  options: Array<GroupType<OptionType>> | Array<OptionType>
): options is Array<GroupType<OptionType>> {
  return options.length > 0 && options[0]["options"] !== undefined;
}

export class MultiDropdownWithSelectAll<OptionType> extends React.PureComponent<
  NonDefaultProps<OptionType> & DefaultProps
> {
  static defaultProps = defaultProps;

  selectAllOption: SelectAllOptionType = {
    value: "_ALL",
    label: this.props.selectAllLabel
  };

  injectSelectAllOptions = (
    options: MultiDropdownWithSelectAll.Props<OptionType>["options"]
  ):
    | Array<OptionType | SelectAllOptionType>
    | Array<GroupType<OptionType | SelectAllOptionType>> => {
    if (options === undefined || options.length === 0) return [];
    else if (isGroupedOptionsArray(options)) {
      return [{ options: [this.selectAllOption] }, ...options];
    } else {
      return [this.selectAllOption, ...options];
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
        onChange: _onChange,
        innerRef,
        ...props
      }
    } = this;

    const Component: React.ComponentType<
      Props<OptionType | SelectAllOptionType>
    > = allowCreate ? Creatable : Select;

    return (
      <Component
        styles={defaultStyle}
        {...props}
        classNamePrefix="dropdown"
        options={this.injectSelectAllOptions(_options)}
        components={{
          ...defaultComponents<OptionType | SelectAllOptionType>(),
          ValueContainer: ({ children, ...props }) => {
            const currentValue = props.getValue();
            return (
              <components.ValueContainer {...props}>
                {Array.isArray(currentValue) && isAll(currentValue[0]) ? (
                  <components.SingleValue
                    {...props}
                    data={this.selectAllOption}
                    innerProps={{}}
                    isDisabled={false}
                  >
                    {this.props.selectAllLabel}
                  </components.SingleValue>
                ) : (
                  children
                )}
              </components.ValueContainer>
            );
          },
          ...customComponents
        }}
        className={cx(
          getCommonClassnames(size, flat || false, props.isSearchable),
          "is-multi",
          className
        )}
        ref={innerRef}
        isSearchable={allowCreate || props.isSearchable}
        isMulti
        onChange={value => {
          const valueArray: (OptionType | SelectAllOptionType)[] =
            value && Array.isArray(value) ? value : [];

          if (
            valueArray.length > 0 &&
            valueArray[valueArray.length - 1] == this.selectAllOption
          ) {
            _onChange(this.selectAllOption);
          } else {
            _onChange(valueArray.filter(a => !isAll(a)) as OptionType[]);
          }
        }}
      />
    );
  }
}
