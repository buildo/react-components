import * as React from 'react';
import { props, t, ReactElement } from '../utils';
import * as Select from 'react-select';
import sortBy = require('lodash/sortBy');
import find = require('lodash/find');
import findIndex = require('lodash/findIndex');
import last = require('lodash/last');
import dropRight = require('lodash/dropRight');
import FlexView from 'react-flexview';
import compact = require('lodash/compact');
import * as cx from 'classnames';
import { warn } from '../utils/log';

function isEmptyArray(x: any): x is any[] {
  return t.Array.is(x) && x.length === 0;
}

const defaultOptionGroupRenderer = (title: string) => title;

export type SimpleValue = string | number;

export type Value = Select.Option | Select.Options | SimpleValue;

export type OptionRendererHandler = (option: Select.Option, i: number) => Select.HandlerRendererResult;

export type OptionGroupRendererHandler = (optionGroup: string) => JSX.Element | string | null;

export interface SelectMissingMenuRendererProps {
  // seem supported by react-select but missing in the @types file?
  instancePrefix?: string
  onFocus?: () => void
  onSelect?: () => void
  optionClassName?: string
  optionComponent: React.ComponentType<{ [k: string]: any }> // TODO
  optionRenderer: OptionRendererHandler
  optionGroupRenderer: OptionGroupRendererHandler
  valueKey: string
}
export interface CustomMenuRendererProps {
  groupByKey?: string
}
export type MenuRendererProps = Select.MenuRendererProps & SelectMissingMenuRendererProps & CustomMenuRendererProps;
export type MenuRendererHandler = (props: MenuRendererProps) => JSX.Element[] | Select.HandlerRendererResult;

export const defaultMenuRenderer: MenuRendererHandler = ({
  focusedOption,
  instancePrefix,
  onFocus,
  onSelect,
  groupByKey,
  optionClassName,
  optionComponent,
  optionRenderer,
  optionGroupRenderer,
  options,
  valueArray,
  valueKey
}) => {
  const OptionComponent = optionComponent;
  type U = { // not inline otherwise breaks VSCode syntax highlight :/
    optionGroupTitle: string,
    optionGroup: Select.Options
  }[];
  const groupedOptions = options.reduce<U>((acc, o, i) => {

    // options are already sorted by group, so we know when a new group starts
    // just by checking the previous option
    const shouldCreateNewGroup = i === 0 || groupByKey && o[groupByKey] !== options[i - 1][groupByKey];

    if (groupByKey && shouldCreateNewGroup) {
      const newGroup = {
        optionGroupTitle: o[groupByKey],
        optionGroup: [o]
      };
      return [...acc, newGroup];
    } else {
      const lastGroup = last(acc)!;
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
        const optionRef = isFocused ? 'focused' : null;
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

export interface RequiredProps {
  /** selected value */
  value?: Value
  /** called when value is changed */
  onChange: (value?: Value | null) => void
  /** the function that can be used to override the default renderer of the selected value */
  valueRenderer?: (option: (Select.Option | Select.Options) & { [k: string]: any }) => JSX.Element | null | false
  /** available options */
  options: Select.Options
  /** whether pressing backspace removes the last item when there is no input value */
  backspaceRemoves?: boolean
  /** placeholder shown when no value is selected */
  placeholder?: string | JSX.Element
  /** if searchable, message shown in the menu when no results are found */
  noResultsText?: string
  /** whether it should be possible to create new options */
  allowCreate?: boolean
  /** if allowCreate is true, message shown to hint the user to press Enter to create a new option */
  addLabelText?: string
  /** the function that can be used to override the default renderer of options */
  optionRenderer?: (option: Select.Option & { [k: string]: any }) => JSX.Element | null | false
  /** called when the value of the `input` is changed */
  onInputChange?: (inputValue: string) => void
  /** called when dropdown is focused */
  onFocus?: React.FocusEventHandler<HTMLDivElement>
  /** called when dropdown is blurred */
  onBlur?: React.FocusEventHandler<HTMLDivElement>
  /** whether it should clear the input box on blur */
  onBlurResetsInput?: boolean
  /** whether it should clear the input box on close */
  onCloseResetsInput?: boolean
  /** whether it is loading options asynchronously */
  isLoading?: boolean
  /** id passed to the wrapper element */
  id?: string
  /** className passed to the wrapper element */
  className?: string
  /** style passed to the wrapper element */
  style?: React.CSSProperties
  /** called when user clicks on the selected value */
  onValueClick?: Select.OnValueClickHandler
};

export type MenuPosition = 'top' | 'bottom';

export interface DefaultProps {
  /** true if it should be possible to select multiple values */
  multi: boolean
  /** if multi is true, string used to separate selected values */
  delimiter: string
  /** medium | small */
  size: 'medium' | 'small'
  /** true if disabled */
  disabled: boolean
  /** true if it should be possible to search the desired value by writing into the dropdown */
  searchable: boolean
  /** true if it should be possible to reset the selected value */
  clearable: boolean
  /** whether it should have a flat style */
  flat: boolean
  /** whether it should blur automatically when the user selects a value */
  autoBlur: boolean
  /** if true, selected values will be passed to onChange as comma-separated string of values (eg "1,2,3") instead of array of objects */
  simpleValue: boolean,
  /** the function that gets used to render the content of an option group */
  optionGroupRenderer: OptionGroupRendererHandler
  /** the function that can be used to override the default drop-down list of options */
  menuRenderer: MenuRendererHandler
  /** the field name to group by */
  groupByKey: string
  /** whether the menu should be rendered on top or bottom when it's open */
  menuPosition: MenuPosition
};

export const Props = {
  value: t.maybe(t.union([t.Number, t.String, t.Object, t.list(t.Object)])),
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
  simpleValue: t.maybe(t.Boolean),
  menuPosition: t.maybe(t.enums.of(['top', 'bottom'])),
  menuRenderer: t.maybe(t.Function),
  groupByKey: t.maybe(t.String),
  optionGroupRenderer: t.maybe(t.Function),
  placeholder: t.maybe(t.union([t.String, ReactElement])),
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

export namespace Dropdown {
  export type Props = RequiredProps & Partial<DefaultProps>
}

type DefaultedProps = RequiredProps & DefaultProps;

@props(Props, { strict: true })
export class Dropdown extends React.Component<Dropdown.Props> {

  static defaultProps: DefaultProps = {
    delimiter: ',',
    size: 'medium',
    disabled: false,
    searchable: false,
    clearable: false,
    multi: false,
    flat: false,
    autoBlur: true,
    simpleValue: true,
    groupByKey: 'optionGroup',
    optionGroupRenderer: defaultOptionGroupRenderer,
    menuRenderer: defaultMenuRenderer,
    menuPosition: 'bottom'
  }

  componentDidMount() {
    this.logWarnings();
  }

  logWarnings = () => {
    if (this.props.children) {
      warn('You\'re passing children. Not expected behaviour');
    }
  };

  valueToOption = (value: Value | undefined, options: Select.Options) => {
    if (t.String.is(value) || t.Number.is(value)) {
      const { multi, delimiter } = this.props as DefaultedProps;
      if (multi) {
        const values = String(value).split(delimiter);
        return compact(values.map(v => find(options, { value: v }) || undefined));
      }
      return find(options, { value }) || undefined;
    }
    return value;
  };

  sortOptionsByGroup = (options: Select.Options) => {
    const { groupByKey } = this.props as DefaultedProps;
    return sortBy(options, option => option[groupByKey] ? findIndex(options, o => option[groupByKey] === o[groupByKey]) : -1);
  }

  getCustomClassNames() {
    const { size, flat, clearable, menuPosition } = this.props as DefaultedProps;
    return cx({
      'is-medium': size === 'medium',
      'is-small': size === 'small',
      'is-flat': flat,
      'is-clearable': clearable,
      'menu-position-top': menuPosition === 'top'
    });
  }

  _onChange = (_value?: Value | null) => {
    const value = (_value === '' || isEmptyArray(_value)) ? null : _value;
    return this.props.onChange(value);
  }

  onInputKeyDown: Select.OnInputKeyDownHandler = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      if (isEmptyArray(this.props.options)) {
        e.preventDefault();
      }
    }
  }

  select: Select | null
  focus = () => { this.select && this.select.focus(); }

  optionGroupRenderer = (title?: string) => {
    return title ? (
      <FlexView className='Select-option-group'>
        {(this.props as DefaultedProps).optionGroupRenderer(title)}
      </FlexView>
    ) : null;
  }

  menuRenderer = (args: Select.MenuRendererProps & SelectMissingMenuRendererProps) => {
    const { menuRenderer, groupByKey } = this.props as DefaultedProps;
    return menuRenderer({
      ...args,
      groupByKey,
      optionGroupRenderer: this.optionGroupRenderer
    });
  }

  render() {
    const {
      _onChange,
      onInputKeyDown,
      props: { className, options, backspaceRemoves, clearable, ...props }
    } = this;

    const selectProps = {
      ...props,
      options: this.sortOptionsByGroup(options),
      clearable,
      backspaceRemoves: t.Nil.is(backspaceRemoves) ? clearable : backspaceRemoves,
      resetValue: null,
      className: cx('dropdown', className, this.getCustomClassNames()),
      value: this.valueToOption(this.props.value, options),
      onInputKeyDown,
      onChange: _onChange,
      menuRenderer: this.menuRenderer as Select.MenuRendererHandler
    };

    return <Select {...selectProps} ref={select => { this.select = select; }} />;
  }
}
