import React from 'react';
import { props, t, skinnable } from '../utils';
import Select from 'react-select';
import find from 'lodash/find';
import omit from 'lodash/omit';
import cx from 'classnames';
import { warn } from '../utils/log';

const isEmptyArray = x => t.Array.is(x) && x.length === 0;

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
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A dropdown field
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
    autoBlur: true
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

  getOnChange = () => this.props.valueLink ? this.props.valueLink.requestChange : this.props.onChange;

  getCustomClassNames() {
    const { size, flat, clearable } = this.props;
    return cx({
      'is-medium': size === 'medium',
      'is-small': size === 'small',
      'is-flat': flat,
      'is-clearable': clearable
    });
  }

  _onChange = _value => {
    const onChange = this.getOnChange();
    const value = isEmptyArray(_value) ? null : _value;
    return onChange(value);
  }

  getLocals() {
    const {
      _onChange,
      props: { className, options, backspaceRemoves, clearable, ...props }
    } = this;

    return {
      ...omit(props, 'valueLink'),
      options,
      clearable,
      backspaceRemoves: t.Nil.is(backspaceRemoves) ? clearable : backspaceRemoves,
      resetValue: null,
      className: cx('dropdown', className, this.getCustomClassNames()),
      value: this.valueToOption(this.getValue(), options),
      onChange: _onChange
    };
  }

  template(locals) {
    return <Select {...locals} />;
  }
}
