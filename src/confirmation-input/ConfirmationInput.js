import React from 'react';
import cx from 'classnames';
import { props, skinnable, t } from '../utils';
import InputChildren from 'react-input-children';
import { linkState } from '../link-state';
import { FlexView } from '../flex';
import Icon from '../Icon/Icon';


@skinnable()
@props({
  initialValue: t.maybe(t.String),
  onConfirm: t.Function,
  onClear: t.Function,
  placeholder: t.maybe(t.String),
  text: t.struct({
    clear: t.maybe(t.String),
    toConfirm: t.maybe(t.String)
  }),
  icon: t.struct({
    clear: t.maybe(t.String),
    toConfirm: t.maybe(t.String)
  }),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class ConfirmationInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      hoveringConfirm: false,
      value: props.initialValue
    };
  }

  componentWillReceiveProps({ initialValue }) {
    if (initialValue !== this.props.initialValue) {
      this.setState({
        value: initialValue
      });
    }
  }

  onEnter = (e) => {
    if (e.which === 13 || e.keyCode === 13) { // if Enter key
      this.props.onConfirm(this.state.value);
    }
  }

  onBlur = () => {
    const { hoveringConfirm } = this.state;
    if (!hoveringConfirm) {
      this.onConfirm();
    }
    this.setState({ focused: false });
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  onConfirm = () => {
    const {
      props: { initialValue, onConfirm },
      state: { value },
      onMouseLeave
    } = this;
    const confirmed = (value === initialValue) || (!value && !initialValue);
    if (!confirmed) {
      onConfirm(value);
      if (!value) {
        onMouseLeave(); // on confirm, if value is empty, `templateConfirm` disappears -> onMouseLeave never called
      }
    }
  }

  onMouseEnter = () => this.setState({ hoveringConfirm: true })

  onMouseLeave = () => this.setState({ hoveringConfirm: false })

  onClear = () => {
    this.props.onClear();
    this.onMouseLeave(); // on clear `templateConfirm` disappears -> onMouseLeave never called
  }

  getLocals() {
    const {
      props: {
        className,
        initialValue,
        text,
        icon,
        ...props
      },
      state: { value , focused },
      onClear, onConfirm,
      onMouseEnter, onMouseLeave
    } = this;
    const confirmed = (value === initialValue) || (!value && !initialValue);
    const showToConfirm = !confirmed;
    const showClear = (value && confirmed && !focused);

    return {
      confirmProps: (showToConfirm || showClear) && {
        text: text[confirmed ? 'clear' : 'toConfirm'],
        icon: icon[confirmed ? 'clear' : 'toConfirm'],
        onMouseDown: showClear ? onClear : onConfirm,
        onMouseEnter,
        onMouseLeave
      },
      inputProps: {
        ...props,
        valueLink: linkState(this, 'value'),
        onKeyUp: this.onEnter,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        wrapper: {
          className: cx('confirmation-input', { focused }, className)
        }
      }
    };
  }

  templateConfirm({ text, icon, ...confirmProps }) {
    const props = {
      style: { cursor: 'pointer' },
      className: 'confirmation',
      vAlignContent: 'center',
      ...confirmProps
    };
    return (
      <FlexView {...props}>
        {icon && <Icon icon={icon} />}
        {text}
      </FlexView>
    );
  }

  template({ inputProps, confirmProps }) {
    return (
      <InputChildren {...inputProps}>
        {confirmProps && this.templateConfirm(confirmProps)}
      </InputChildren>
    );
  }

}
