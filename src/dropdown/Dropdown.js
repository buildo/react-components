import React from 'react';
import { props, t, skinnable } from '../utils';
import Select from 'react-select';
import find from 'lodash/find';
import omit from 'lodash/omit';
import cx from 'classnames';
import { warn } from '../utils/log';

const PropTypes = {
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
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@skinnable()
@props(PropTypes, { strict: false })
export default class Dropdown extends React.Component {

  static defaultProps = {
    delimiter: ',',
    size: 'medium',
    disabled: false,
    searchable: false,
    clearable: false,
    multi: false,
    flat: false
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

  _onBlur = () => this.forceUpdate();

  getCustomClassNames() {
    const { size, flat, clearable } = this.props;
    return cx({
      'is-medium': size === 'medium',
      'is-small': size === 'small',
      'is-flat': flat,
      'is-clearable': clearable
    });
  }

  getLocals() {
    const { className, options, backspaceRemoves, clearable, ...props } = this.props;

    return {
      ...omit(props, 'valueLink'),
      options,
      clearable,
      backspaceRemoves: t.Nil.is(backspaceRemoves) ? clearable : backspaceRemoves,
      className: cx('dropdown', className, this.getCustomClassNames()),
      value: this.valueToOption(this.getValue(), options),
      onChange: this.getOnChange(),
      onBlur: this._onBlur
    };
  }

  template(locals) {
    return <Select {...locals} />;
  }
}
