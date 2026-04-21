import * as React from 'react';
import Select, {
  components as RSComponents,
  ContainerProps,
  GroupBase,
  Props as SelectProps
} from 'react-select';
import { CreatableProps } from 'react-select/creatable';
import cx from 'classnames';
import { DataAttributes } from '../utils';

export type DefaultProps = {
  delimiter: NonNullable<SelectProps['delimiter']>;
  size: 'medium' | 'small';
  isSearchable: NonNullable<SelectProps['isSearchable']>;
  menuPlacement: NonNullable<SelectProps['menuPlacement']>;
};

export type CommonProps<OptionType, IsMulti extends boolean> = Omit<
  SelectProps<OptionType, IsMulti>,
  'onChange' | 'value' | 'disabled' | 'options'
> & {
  flat?: boolean;
  innerRef?: (ref: Select | null) => void;
  options: NonNullable<SelectProps<OptionType>['options']>;
  style?: React.CSSProperties;
} & (
    | ({
        allowCreate: true;
        isSearchable?: never;
      } & CreatableProps<OptionType, false, GroupBase<OptionType>>)
    | {
        allowCreate?: never;
      }
  );

export const defaultProps: DefaultProps = {
  delimiter: ',',
  size: 'medium',
  isSearchable: false,
  menuPlacement: 'bottom'
};

/**
 * Carries consumer-supplied `data-*` attributes from the dropdown variants
 * down to the default SelectContainer below, which spreads them onto
 * react-select's own root element. Consumers who override
 * `components.SelectContainer` should also read this context to preserve
 * data-* forwarding.
 */
export const DataAttributesContext = React.createContext<DataAttributes>({});

const IndicatorSeparator = () => null;

const SelectContainerWithDataAttributes: React.ComponentType<ContainerProps<
  any,
  any
>> = props => {
  const dataAttrs = React.useContext(DataAttributesContext);
  return (
    <RSComponents.SelectContainer
      {...props}
      innerProps={{ ...props.innerProps, ...dataAttrs } as ContainerProps<any, any>['innerProps']}
    />
  );
};

export const defaultComponents = <
  OptionType extends unknown,
  IsMulti extends boolean
>(): SelectProps<OptionType, IsMulti>['components'] => ({
  IndicatorSeparator,
  SelectContainer: SelectContainerWithDataAttributes as NonNullable<
    SelectProps<OptionType, IsMulti>['components']
  >['SelectContainer']
});

export const getCommonClassnames = (
  size: DefaultProps['size'],
  flat: boolean,
  isSearchable: boolean
) => {
  return cx({
    dropdown: true,
    'is-medium': size === 'medium',
    'is-small': size === 'small',
    'is-flat': flat,
    'is-searchable': isSearchable
  });
};

export const defaultStyle = {
  input: () => ({ margin: 0, padding: 0 })
};
