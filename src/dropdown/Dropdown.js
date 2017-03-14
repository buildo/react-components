import React from 'react';
import { props, t, skinnable } from '../utils';
import Select from 'react-select';
import find from 'lodash/find';
import omit from 'lodash/omit';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import sortBy from 'lodash/orderBy';
import FlexView from 'react-flexview';
import cx from 'classnames';
import { warn } from '../utils/log';

const isEmptyArray = x => t.Array.is(x) && x.length === 0;

const defaultOptionGroupRenderer = title => title;

export const Props = {
  value: t.maybe(t.union([t.Number, t.String, t.Object, t.list(t.Object)])),
  valueLink: t.maybe(t.struct({
    value: t.maybe(t.union([t.Number, t.String, t.Object, t.list(t.Object)])),
    requestChange: t.Function
  })),
  onChange: t.maybe(t.Function),
  options: t.list(t.Object),
  size: t.enums.of(['medium', 'small']),
  disabled: t.maybe(t.Boolean),
  searchable: t.maybe(t.Boolean),
  clearable: t.maybe(t.Boolean),
  backspaceRemoves: t.maybe(t.Boolean),
  multi: t.maybe(t.Boolean),
  flat: t.maybe(t.Boolean),
  autoBlur: t.maybe(t.Boolean),
  simpleValue: t.maybe(t.Boolean),
  menuPosition: t.enums.of(['top', 'bottom']),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  menuRenderer: t.maybe(t.Function),
  groupByKey: t.maybe(t.String),
  optionGroupRenderer: t.maybe(t.Function)
};

/** A dropdown field based on [react-select](https://github.com/JedWatson/react-select)
 * @param value - selected value
 * @param valueLink - defines actions to be taken when a particular value is selected
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
 * @param simpleValue - if true, selected values will be passed to onChange as comma-separated string of values (eg "1,2,3") instead of array of objects
 * @param menuRenderer - the function that can be used to override the default drop-down list of options
 * @param groupByKey - the field name to group by
 * @param optionGroupRenderer - the function that gets used to render the content of an option group
 * @param menuPosition - whether the menu should be rendered on top or bottom when it's open
 */
@skinnable()
@props(Props, { strict: false })
export default class Dropdown extends React.Component {

  static defaultProps = {
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

  getValue = () => (
    this.props.valueLink ? this.props.valueLink.value : this.props.value
  );

  valueToOption = (value, options) => {
    if (t.String.is(value) || t.Number.is(value)) {
      const { multi, delimiter } = this.props;
      if (multi) {
        const values = String(value).split(delimiter);
        return values.map(v => find(options, { value: v }));
      }
      return find(options, { value });
    }
    return value;
  };

  sortOptionsByGroup = (options) => {
    return sortBy(options, (option) => {
      if (option[this.props.groupByKey] === undefined) {
        return '';
      }
      else {
        return option[this.props.groupByKey];
      }
    });
  }

  getOnChange = () => this.props.valueLink ? this.props.valueLink.requestChange : this.props.onChange;

  getCustomClassNames() {
    const { size, flat, clearable, menuPosition } = this.props;
    return cx({
      'is-medium': size === 'medium',
      'is-small': size === 'small',
      'is-flat': flat,
      'is-clearable': clearable,
      'menu-position-top': menuPosition === 'top'
    });
  }

  _onChange = _value => {
    const onChange = this.getOnChange();
    const value = isEmptyArray(_value) ? null : _value;
    return onChange(value);
  }

  onInputKeyDown = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      if (isEmptyArray(this.props.options)) {
        e.preventDefault();
      }
    }
  }

  focus = () => { this.select.focus(); }

  optionGroupRenderer = ( title ) => {
    if (title === 'undefined') {
      return null;
    }
    else {
      return (
        <FlexView className='Select-option-group'>
          {this.props.optionGroupRenderer(title)}
        </FlexView>
      );
    }
  }

  _menuRenderer = ({
    focusedOption,
    instancePrefix,
    onFocus,
    onSelect,
    optionClassName,
    optionComponent,
    optionRenderer,
    options,
    valueArray,
    valueKey
  }) => {

    const Option = optionComponent;
    const propertyName = this.props.groupByKey;

    return map(groupBy(options, propertyName), (optionGroup, optionGroupTitle) => {
      return (
        <FlexView column key={optionGroupTitle}>
          {this.optionGroupRenderer(optionGroupTitle)}
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
              <Option
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
              </Option>
            );
          })}
        </FlexView>
      );
    });
  }

  getLocals() {
    const {
      _onChange,
      onInputKeyDown,
      _menuRenderer,
      props: { className, options, backspaceRemoves, clearable, ...props }
    } = this;

    return {
      ...omit(props, 'valueLink'),
      options: this.sortOptionsByGroup(options),
      clearable,
      backspaceRemoves: t.Nil.is(backspaceRemoves) ? clearable : backspaceRemoves,
      resetValue: null,
      className: cx('dropdown', className, this.getCustomClassNames()),
      value: this.valueToOption(this.getValue(), options),
      onInputKeyDown,
      onChange: _onChange,
      menuRenderer: this.props.menuRenderer || _menuRenderer
    };
  }

  template(locals) {
    return <Select {...locals} ref={select => { this.select = select; }} />;
  }
}
