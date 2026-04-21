import * as React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import cx from 'classnames';
import {
  CommonProps,
  DataAttributesContext,
  defaultProps,
  defaultComponents,
  defaultStyle,
  getCommonClassnames,
  DefaultProps
} from './commons';
import { DataAttributes, pickDataAttributes } from '../utils';

type NonDefaultProps<OptionType> = Omit<CommonProps<OptionType, true>, 'isMulti'> & {
  value: OptionType[];
  onChange: (value: OptionType[]) => void;
};

export type MultiDropdownProps<OptionType> = NonDefaultProps<OptionType> &
  Partial<DefaultProps> &
  DataAttributes;

export class MultiDropdown<OptionType> extends React.PureComponent<MultiDropdownProps<OptionType>> {
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
      <DataAttributesContext.Provider value={pickDataAttributes(this.props)}>
        <Component
          styles={defaultStyle}
          {...props}
          classNamePrefix="dropdown"
          components={{
            ...defaultComponents<OptionType, true>(),
            ...customComponents
          }}
          className={cx(
            getCommonClassnames(size, flat || false, props.isSearchable),
            'is-multi',
            className
          )}
          ref={innerRef}
          isSearchable={allowCreate || props.isSearchable}
          isMulti
        />
      </DataAttributesContext.Provider>
    );
  }
}
