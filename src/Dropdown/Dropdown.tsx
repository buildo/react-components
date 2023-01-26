import * as React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import * as cx from 'classnames';
import {
  CommonProps,
  defaultProps,
  defaultComponents,
  defaultStyle,
  getCommonClassnames,
  DefaultProps
} from './commons';

export type NonDefaultProps<OptionType> = Omit<CommonProps<OptionType, false>, 'isMulti'> &
  (
    | {
        isClearable: true;
        value: OptionType | null;
        onChange: (value: OptionType | null) => void;
      }
    | {
        isClearable?: false;
        value: OptionType;
        onChange: (value: OptionType) => void;
      }
  );

export type DropdownProps<OptionType> = NonDefaultProps<OptionType> & Partial<DefaultProps>;

export class Dropdown<OptionType> extends React.PureComponent<DropdownProps<OptionType>> {
  static defaultProps = defaultProps;

  render() {
    const {
      className,
      components: customComponents,
      innerRef,
      allowCreate,
      size,
      flat,
      ...props
    } = this.props as NonDefaultProps<OptionType> & DefaultProps;

    const Component: any = allowCreate ? Creatable : Select;

    return (
      <Component
        styles={defaultStyle}
        {...props}
        classNamePrefix="dropdown"
        components={{
          ...defaultComponents<OptionType, false>(),
          ...customComponents
        }}
        className={cx(getCommonClassnames(size, flat || false, props.isSearchable), className)}
        ref={innerRef}
        isSearchable={allowCreate || props.isSearchable}
      />
    );
  }
}
