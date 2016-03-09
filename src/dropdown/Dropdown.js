import React from 'react';
import { props, t, skinnable } from '../utils';
import Select from 'react-select';
import find from 'lodash/find';
import cx from 'classnames';
import { warn } from '../utils/log';

const PropTypes = {
  value: t.maybe(t.union([t.Number, t.String, t.Object])),
  onChange: t.maybe(t.Function),
  options: t.Array,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@skinnable()
@props(PropTypes, { strict: false })
export default class Dropdown extends React.Component {

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
      return find(options, { value });
    }
    return value;
  };

  _onChange = () => this.props.valueLink ? this.props.valueLink.requestChange : this.props.onChange;

  _onBlur = () => this.forceUpdate();

  getLocals() {
    const {
      className,
      options,
      valueLink,
      ...props
    } = this.props;

    return {
      ...props,
      options,
      className: cx('dropdown', className),
      value: this.valueToOption(this.getValue(), options),
      onChange: this._onChange(),
      onBlur: this._onBlur
    };
  }

  template(locals) {
    return <Select {...locals} />;
  }
}
