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
import { ObjectOmit } from "src/utils";

type SelectAllOptionType = { value: "_ALL"; label: string };

type NonDefaultProps<OptionType> = ObjectOmit<
  CommonProps<OptionType | SelectAllOptionType>,
  "innerRef"
> & {
  selectAll: { label: string };
  value: OptionType[] | SelectAllOptionType;
  onChange: (value: OptionType[] | SelectAllOptionType, isAll: boolean) => void;
};

export function isAll<OptionType>(
  value: OptionType[] | SelectAllOptionType
): value is SelectAllOptionType {
  return value["value"] === "_ALL";
}

export namespace MultiDropdownWithSelectAll {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps>;
}

function concatUnion<A, B>(a: Array<A>, b: Array<B>): Array<A | B> {
  return (a as Array<A | B>).concat(b);
}

export class MultiDropdownWithSelectAll<OptionType> extends React.PureComponent<
  NonDefaultProps<OptionType> & DefaultProps
> {
  static defaultProps = defaultProps;

  selectAllOption: SelectAllOptionType = {
    value: "_ALL",
    label: this.props.selectAll.label
  };

  injectSelectAllOptions = (
    options: MultiDropdownWithSelectAll.Props<OptionType>["options"]
  ) => {
    if (options === undefined || options.length === 0) return [];
    else if (options[0]["options"] !== undefined) {
      return concatUnion(
        [{ options: [this.selectAllOption] }],
        options as Array<GroupType<OptionType>>
      );
    } else {
      return concatUnion([this.selectAllOption], options as Array<OptionType>);
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
                {Array.isArray(currentValue) &&
                currentValue[0] === this.selectAllOption ? (
                  <components.SingleValue
                    {...props}
                    data={this.selectAllOption}
                    innerProps={{}}
                    isDisabled={false}
                  >
                    {this.props.selectAll.label}
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
        isSearchable={allowCreate || props.isSearchable}
        isMulti
        onChange={value => {
          const valueArray: (OptionType | SelectAllOptionType)[] =
            value && Array.isArray(value) ? value : [];

          if (
            valueArray.length > 0 &&
            valueArray[valueArray.length - 1] == this.selectAllOption
          ) {
            _onChange(this.selectAllOption, true);
          } else {
            _onChange(
              valueArray.filter(
                a => a !== this.selectAllOption
              ) as OptionType[],
              false
            );
          }
        }}
      />
    );
  }
}
