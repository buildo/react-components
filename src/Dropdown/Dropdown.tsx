import * as React from 'react';
import { props } from '../utils';
import { t } from 'tcomb-react';
import * as Select from 'react-select';
import sortBy = require('lodash/sortBy');
import findIndex = require('lodash/findIndex');
import last = require('lodash/last');
import dropRight = require('lodash/dropRight');
import omit = require('lodash/omit');
import FlexView from 'react-flexview';
import cx from 'classnames';
import { warn } from '../utils/log';

const isEmptyArray = (x: any) => t.Array.is(x) && x.length === 0;

export type OptionGroupRenderer = (title: string) => JSX.Element | string | null;

const defaultOptionGroupRenderer: OptionGroupRenderer = title => title;

export type SimpleValue = string | number | boolean;
export type DropdownOption<T extends SimpleValue, O extends {}> = {
  value: T
  label: string
  disabled?: boolean
  optionGroup?: any // so that we can default the `groupByKeyProp` to something
} & O;
export type DropdownValue<T extends SimpleValue, O extends {}> = DropdownOption<T, O>;

export type OptionComponentProps<T extends SimpleValue, O extends DropdownOption<T, {}>> = {
  option: DropdownOption<T, O>
  className: string
  instancePrefix: string
  isDisabled?: boolean
  isFocused: boolean
  isSelected: boolean
  key: string
  onFocus: () => void
  onSelect: () => void
  optionIndex: number
  ref: string | undefined
};

export type ReactSelectMenuRendererProps<T extends SimpleValue, O extends DropdownOption<T, {}>, Opt = DropdownOption<T, O>> = {
  focusedOption: Opt
  focusOption: (option: Opt) => void
  options: Opt[]
  selectValue: (option: Opt) => void
  valueArray: Opt[]
  valueKey: keyof O
  instancePrefix: string
  onFocus: () => any // TODO
  onSelect: () => any // TODO
  optionClassName: string
  optionComponent: React.ComponentType<OptionComponentProps<T, O>>
  optionRenderer: (option: Opt, i: number) => string | JSX.Element // TODO check
};
export type AdditionalMenuRenderProps<O extends {}> = {
  groupByKey: keyof O
  optionGroupRenderer: OptionGroupRenderer
}
export type MenuRendererProps<T extends SimpleValue, O extends DropdownOption<T, {}>> = ReactSelectMenuRendererProps<T, O> & AdditionalMenuRenderProps<O>;

export const defaultMenuRenderer = <T extends SimpleValue, O extends DropdownOption<T, {}>>({
  focusedOption,
  instancePrefix,
  onFocus,
  onSelect,
  optionClassName,
  optionComponent: OptionComponent,
  optionRenderer,
  options,
  valueArray,
  valueKey,
  groupByKey,
  optionGroupRenderer
}: MenuRendererProps<T, O>) => {
  type U = { // not inline otherwise breaks VSCode syntax highlight :/
    optionGroupTitle: string,
    optionGroup: DropdownOption<T, O>[]
  }[];
  const groupedOptions = options.reduce<U>((acc, o, i) => {
    // options are already sorted by group, so we know when a new group starts
    // just by checking the previous option
    const shouldCreateNewGroup = i === 0 || o[groupByKey] !== options[i - 1][groupByKey];

    if (shouldCreateNewGroup) {
      const newGroup = {
        optionGroupTitle: o[groupByKey],
        optionGroup: [o]
      };
      return [...acc, newGroup];
    } else {
      const lastGroup = last(acc)!; // TODO `!`
      return [...dropRight(acc), {
        optionGroupTitle: lastGroup.optionGroupTitle,
        optionGroup: [...lastGroup.optionGroup, o]
      }];
    }
  }, []);

  return groupedOptions.map(({ optionGroup, optionGroupTitle }) => (
    <FlexView column key={optionGroupTitle || ''}>
      {optionGroupRenderer(optionGroupTitle)}
      {optionGroup.map((option, i) => {
        const isSelected = valueArray && valueArray.indexOf(option) > -1;
        const isFocused = option === focusedOption;
        const optionRef = isFocused ? 'focused' : undefined;
        const optionClass = cx(optionClassName, {
          'Select-option': true,
          'is-selected': isSelected,
          'is-focused': isFocused,
          'is-disabled': option.disabled
        });
        return (
          <OptionComponent
            className={optionClass}
            instancePrefix={instancePrefix}
            isDisabled={option.disabled}
            isFocused={isFocused}
            isSelected={isSelected}
            key={`option-${i}-${option[valueKey]}`}
            onFocus={onFocus}
            onSelect={onSelect}
            option={option}
            optionIndex={i}
            ref={optionRef}
          >
            {optionRenderer(option, i)}
          </OptionComponent>
        );
      })}
    </FlexView>
  ));
};

export type ValueProps<T extends SimpleValue, O extends DropdownOption<T, {}>> = {
  multi?: false
  value?: DropdownValue<T, O>
  onChange: (value?: DropdownValue<T, O>) => void
  valueRenderer?: (option: DropdownOption<T, O>) => JSX.Element | null | false
} | {
  multi: true
  value?: DropdownValue<T, O>[]
  onChange: (value: DropdownValue<T, O>[] | null) => void
  valueRenderer?: (option: DropdownOption<T, O>[]) => JSX.Element | null | false
};

export type RequiredProps<T extends SimpleValue, O extends DropdownOption<T, {}> = DropdownOption<T, {}>> = ValueProps<T, O> & {
  options: DropdownOption<T, O>[]
  backspaceRemoves?: boolean
  menuPosition?: 'top' | 'bottom'
  placeholder?: string | JSX.Element
  noResultsText?: string
  allowCreate?: boolean
  addLabelText?: string
  optionRenderer?: (option: DropdownOption<T, O>) => JSX.Element | null | false
  onInputChange?: (inputValue: string) => void
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  onBlur?: React.FocusEventHandler<HTMLDivElement>
  onBlurResetsInput?: boolean
  onCloseResetsInput?: boolean
  isLoading?: boolean
  id?: string
  className?: string
  style?: React.CSSProperties
  onValueClick?: (value: string, event: React.MouseEvent<HTMLAnchorElement>) => void; // TODO: copied from react-select @types
};

export type DefaultProps<T extends SimpleValue, O extends DropdownOption<T, {}>> = {
  delimiter: string
  size: 'medium' | 'small'
  disabled: boolean
  searchable: boolean
  clearable: boolean
  flat: boolean
  autoBlur: boolean
  optionGroupRenderer: OptionGroupRenderer
  menuRenderer: (props: MenuRendererProps<T, O>) => JSX.Element[]
  groupByKey: keyof O
};

const defaultProps = {
  delimiter: ',',
  size: 'medium',
  disabled: false,
  searchable: false,
  clearable: false,
  multi: false,
  flat: false,
  autoBlur: true,
  optionGroupRenderer: defaultOptionGroupRenderer,
  menuRenderer: defaultMenuRenderer,
  menuPosition: 'bottom',
  groupByKey: 'optionGroup'
};

export type Props<T extends SimpleValue, O extends DropdownOption<T, {}>> =
  Partial<DefaultProps<T, O>> & RequiredProps<T, O>;

export const Props = {
  value: t.maybe(t.union([t.Object, t.list(t.Object)])),
  onChange: t.maybe(t.Function),
  onValueClick: t.maybe(t.Function),
  options: t.list(t.Object),
  size: t.maybe(t.enums.of(['medium', 'small'])),
  disabled: t.maybe(t.Boolean),
  searchable: t.maybe(t.Boolean),
  clearable: t.maybe(t.Boolean),
  backspaceRemoves: t.maybe(t.Boolean),
  multi: t.maybe(t.Boolean),
  flat: t.maybe(t.Boolean),
  autoBlur: t.maybe(t.Boolean),
  menuPosition: t.maybe(t.enums.of(['top', 'bottom'])),
  menuRenderer: t.maybe(t.Function),
  groupByKey: t.maybe(t.String),
  optionGroupRenderer: t.maybe(t.Function),
  placeholder: t.maybe(t.union([t.String, t.ReactElement])),
  noResultsText: t.maybe(t.String),
  allowCreate: t.maybe(t.Boolean),
  addLabelText: t.maybe(t.String),
  valueRenderer: t.maybe(t.Function),
  optionRenderer: t.maybe(t.Function),
  delimiter: t.maybe(t.String),
  onInputChange: t.maybe(t.Function),
  onFocus: t.maybe(t.Function),
  onBlur: t.maybe(t.Function),
  onBlurResetsInput: t.maybe(t.Boolean),
  onCloseResetsInput: t.maybe(t.Boolean),
  isLoading: t.maybe(t.Boolean),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A dropdown field based on [react-select](https://github.com/JedWatson/react-select)
 * @param value - selected value
 * @param onChange - called when value is changed
 * @param options - available options
 * @param size - medium | small
 * @param disabled - true if disabled
 * @param searchable - true if it should be possible to search the desired value by writing into the dropdown
 * @param clearable - true if it should be possible to reset the selected value
 * @param backspaceRemoves - whether pressing backspace removes the last item when there is no input value
 * @param multi - true if it should be possible to select multiple values
 * @param flat - whether it should have a flat style
 * @param autoBlur - whether it should blur automatically when the user selects a value
 * @param optionRenderer - the function that can be used to override the default renderer of options
 * @param valueRenderer - the function that can be used to override the default renderer of the selected value
 * @param menuRenderer - the function that can be used to override the default drop-down list of options
 * @param groupByKey - the field name to group by
 * @param optionGroupRenderer - the function that gets used to render the content of an option group
 * @param menuPosition - whether the menu should be rendered on top or bottom when it's open
 * @param placeholder - placeholder shown when no value is selected
 * @param noResultsText - if searchable, message shown in the menu when no results are found
 * @param allowCreate - whether it should be possible to create new options
 * @param addLabelText - if allowCreate is true, message shown to hint the user to press Enter to create a new option
 * @param delimiter - if multi is true, string used to separate selected values
 * @param onFocus - called when dropdown is focused
 * @param onBlur - called when dropdown is blurred
 * @param onInputChange - called when the value of the `input` is changed
 * @param onValueClick - called when user clicks on the selected value
 * @param onBlurResetsInput - whether it should clear the input box on blur
 * @param onCloseResetsInput - wheter it should clear the input box on close
 * @param isLoading - whether it is loading options asynchronously
 */
@props(Props, { strict: true })
export default class Dropdown<T extends SimpleValue, O extends DropdownOption<T, {}> = DropdownOption<T, {}>> extends React.Component<Props<T, O>> {

  static defaultProps = defaultProps;

  getProps() {
    return { ...defaultProps, ...omit(this.props, 'children') } as DefaultProps<T, O> & RequiredProps<T, O>;
  }

  componentDidMount() {
    this.logWarnings();
  }

  logWarnings = () => {
    if (this.props.children) {
      warn('You\'re passing children. Not expected behaviour');
    }
  };

  sortOptionsByGroup(options: DropdownOption<T, O>[]) {
    const groupByKey = this.getProps().groupByKey!; // we know there's one here...
    return sortBy(options, option => option[groupByKey] ? findIndex(options, o => option[groupByKey] === o[groupByKey]) : -1);
  }

  getCustomClassNames() {
    const { size, flat, clearable, menuPosition } = this.getProps();
    return cx({
      'is-medium': size === 'medium',
      'is-small': size === 'small',
      'is-flat': flat,
      'is-clearable': clearable,
      'menu-position-top': menuPosition === 'top'
    });
  }

  _onChange = (_value: DropdownValue<T, O> | DropdownValue<T, O>[]) => {
    const props = this.getProps();
    if (props.multi && isEmptyArray(_value)) {
      props.onChange(null);
    } else {
      (props.onChange as any)(_value); // TODO: not sure how to fix this
    }
  }

  onInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      if (isEmptyArray(this.getProps().options)) {
        e.preventDefault();
      }
    }
  }

  select: Select | null;
  focus = () => { this.select && this.select.focus(); }

  optionGroupRenderer = (title: string) => {
    return title ? (
      <FlexView className='Select-option-group'>
        {this.getProps().optionGroupRenderer(title)}
      </FlexView>
    ) : null;
  }

  menuRenderer = (props: ReactSelectMenuRendererProps<T, O>) => {
    const optionGroupRenderer = this.optionGroupRenderer;
    const { menuRenderer, groupByKey } = this.getProps();
    return menuRenderer({
      ...props,
      groupByKey,
      optionGroupRenderer
    });
  }

  render() {
    const {
      _onChange,
      onInputKeyDown,
      props: { className, options, backspaceRemoves, clearable, valueRenderer, ...props }
    } = this;

    const selectProps = {
      ...props,
      valueRenderer: valueRenderer as any as Select['props']['valueRenderer'], // TODO: couldn't avoid this cast
      options: this.sortOptionsByGroup(options),
      clearable,
      backspaceRemoves: t.Nil.is(backspaceRemoves) ? clearable : backspaceRemoves,
      resetValue: null,
      className: cx('dropdown', className, this.getCustomClassNames()),
      onInputKeyDown,
      onChange: _onChange,
      menuRenderer: this.menuRenderer as any as Select['props']['menuRenderer']// TODO: couldn't avoid this cast
    };

    return <Select {...selectProps} ref={select => { this.select = select; }} />;
  }
}
