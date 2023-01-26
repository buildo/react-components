import * as React from 'react';
import Select, {
  ActionMeta,
  components,
  GroupBase,
  MultiValue,
  ValueContainerProps
} from 'react-select';

import Creatable, { CreatableProps } from 'react-select/creatable';
import cx from 'classnames';
import {
  CommonProps,
  defaultProps,
  defaultComponents,
  defaultStyle,
  getCommonClassnames,
  DefaultProps
} from './commons';

export function allSelected<OptionType = never>(): SelectAllValue<OptionType> {
  return { type: 'AllSelected' };
}

export function someSelected<OptionType>(values: OptionType[]): SelectAllValue<OptionType> {
  return { type: 'SomeSelected', values };
}

type SelectAllOptionType = { value: '_ALL'; label: string };
export type SelectAllValue<OptionType> =
  | {
      type: 'AllSelected';
    }
  | {
      type: 'SomeSelected';
      values: OptionType[];
    };

type NonDefaultProps<OptionType> = Omit<
  CommonProps<OptionType | SelectAllOptionType, true>,
  'isMulti'
> & {
  selectAllLabel: string;
  value: SelectAllValue<OptionType>;
  onChange: (value: SelectAllValue<OptionType>) => void;
  options: CommonProps<OptionType, true>['options'];
};

export type MultiDropdownWithSelectAllProps<OptionType> = NonDefaultProps<OptionType> &
  Partial<DefaultProps>;

function isGroupedOptionsArray<OptionType>(
  options: MultiDropdownWithSelectAllProps<OptionType>['options']
): options is Array<GroupBase<OptionType>> {
  return options.length > 0 && (options[0] as any).hasOwnProperty('options');
}

export class MultiDropdownWithSelectAll<OptionType> extends React.PureComponent<
  MultiDropdownWithSelectAllProps<OptionType>
> {
  static defaultProps = defaultProps;

  selectAllOption: SelectAllOptionType = {
    value: '_ALL',
    label: this.props.selectAllLabel
  };

  // if this component is defined inside the render method, the search input will lose focus
  // every time the component is re-rendered (e.g. every time we set new async options)
  valueContainer = (
    valueContainerProps: ValueContainerProps<OptionType | SelectAllOptionType, true>
  ) => {
    if (this.props.value && this.props.value.type === 'AllSelected') {
      const { children, ...otherProps } = valueContainerProps;
      const childrenWithoutValues = React.Children.toArray(children).filter(
        c => !!c && (c as any).type.name !== 'MultiValue'
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
    options: MultiDropdownWithSelectAllProps<OptionType>['options']
  ):
    | Array<OptionType | SelectAllOptionType>
    | Array<GroupBase<OptionType | SelectAllOptionType>> => {
    if (isGroupedOptionsArray(options)) {
      return [{ options: [this.selectAllOption] }, ...options];
    } else {
      return [this.selectAllOption, ...options] as Array<OptionType | SelectAllOptionType>;
    }
  };

  onChange = (
    newValue: MultiValue<SelectAllOptionType | OptionType>,
    _meta: ActionMeta<OptionType | SelectAllOptionType>
  ) => {
    const valueArray: (OptionType | SelectAllOptionType)[] =
      newValue && Array.isArray(newValue) ? newValue : [];

    if (valueArray.length > 0 && valueArray[valueArray.length - 1] == this.selectAllOption) {
      this.props.onChange({ type: 'AllSelected' });
    } else {
      this.props.onChange({
        type: 'SomeSelected',
        values: valueArray.filter(a => a !== this.selectAllOption) as OptionType[]
      });
    }
  };

  render() {
    const {
      className,
      components: customComponents,
      allowCreate,
      size,
      flat,
      options: _options,
      innerRef,
      value: selectAllValue,
      ...props
    } = this.props as NonDefaultProps<OptionType> & DefaultProps;

    const Component: React.ComponentType<CreatableProps<
      OptionType | SelectAllOptionType,
      true,
      GroupBase<OptionType | SelectAllOptionType>
    > &
      React.RefAttributes<any>> = allowCreate ? Creatable : Select;

    const dropdownValue = selectAllValue
      ? selectAllValue.type === 'AllSelected'
        ? this.selectAllOption
        : selectAllValue.values
      : [];

    return (
      <Component
        classNamePrefix="dropdown"
        className={cx(
          getCommonClassnames(size, flat || false, props.isSearchable),
          'is-multi',
          className
        )}
        styles={defaultStyle}
        {...props}
        value={dropdownValue}
        onChange={this.onChange}
        options={this.injectSelectAllOptions(_options)}
        components={{
          ...defaultComponents<OptionType | SelectAllOptionType, true>(),
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
