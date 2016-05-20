import React from 'react';
import { props, t, skinnable } from '../utils';
import Select from 'react-select';
import omit from 'lodash/omit';
import cx from 'classnames';
import { warn } from '../utils/log';

const Option = t.interface({
  value: t.union([t.Number, t.String]),
  label: t.String
});

const Value = t.union([Option, t.list(Option)]);

export const Props = {
  value: t.maybe(Value),
  valueLink: t.maybe(t.interface({
    value: t.maybe(Value),
    requestChange: t.Function
  })),
  onChange: t.maybe(t.Function),
  options: t.list(Option),
  size: t.enums.of(['medium', 'small']),
  disabled: t.maybe(t.Boolean),
  searchable: t.maybe(t.Boolean),
  clearable: t.maybe(t.Boolean),
  onBlurResetsInput: t.maybe(t.Boolean),
  autoBlur: t.maybe(t.Boolean),
  backspaceRemoves: t.maybe(t.Boolean),
  escapeClearsValue: t.maybe(t.Boolean),
  multi: t.maybe(t.Boolean),
  flat: t.maybe(t.Boolean),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@skinnable()
@props(Props, { strict: false })
export default class Dropdown extends React.Component {

  static defaultProps = {
    size: 'medium',
    disabled: false,
    searchable: false,
    clearable: false,
    onBlurResetsInput: true,
    autoBlur: true,
    backspaceRemoves: true,
    escapeClearsValue: false,
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

  getLocals({ className, options, backspaceRemoves, clearable, ...props }) {
    return {
      ...omit(props, 'valueLink'),
      options,
      clearable,
      backspaceRemoves: t.Nil.is(backspaceRemoves) ? clearable : backspaceRemoves,
      className: cx('dropdown', className, this.getCustomClassNames()),
      value: this.getValue(),
      onChange: this.getOnChange()
    };
  }

  template(locals) {
    return <Select {...locals} />;
  }
}
