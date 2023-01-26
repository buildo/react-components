import Select, { GroupBase, Props as SelectProps } from 'react-select';
import { CreatableProps } from 'react-select/creatable';
import cx from 'classnames';

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

export const defaultComponents = <
  OptionType extends unknown,
  IsMulti extends boolean
>(): SelectProps<OptionType, IsMulti>['components'] => ({
  IndicatorSeparator: () => null
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
