import React from 'react';
import cx from 'classnames';
import { props, skinnable, t } from '../utils';
import InputLink from 'react-input-link';
import { linkState } from '../link-state';
import { FlexView } from '../flex';
import Icon from '../Icon/Icon';


@skinnable()
@props({
  initialValue: t.maybe(t.String),
  onConfirm: t.Function,
  placeholder: t.maybe(t.String),
  text: t.struct({
    confirmed: t.maybe(t.String),
    toConfirm: t.maybe(t.String)
  }),
  icon: t.struct({
    confirmed: t.maybe(t.String),
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
    this.props.onConfirm(this.state.value);
    this.setState({ focused: false });
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  getLocals() {
    const {
      className,
      initialValue,
      onConfirm,
      text,
      icon,
      ...props
    } = this.props;
    const { value , focused } = this.state;
    const confirmed = (value === initialValue) || (!value && !initialValue);

    return {
      className,
      focused,
      confirmProps: {
        text: text[confirmed ? 'confirmed' : 'toConfirm'],
        icon: icon[confirmed ? 'confirmed' : 'toConfirm']
      },
      inputProps: {
        ...props,
        valueLink: linkState(this, 'value'),
        onKeyUp: this.onEnter,
        onBlur: this.onBlur,
        onFocus: this.onFocus
      }
    }
  }

  templateConfirm({ text, icon }) {
    return (
      <FlexView className="confirmation" vAlignContent="center">
        {icon && <Icon icon={icon} />}
        {text}
      </FlexView>
    )
  }

  template({ className, focused, confirmProps, inputProps }) {
    return (
      <InputLink {...inputProps} wrapperClassName={cx('confirmation-input', { focused }, className)}>
        {this.templateConfirm(confirmProps)}
      </InputLink>
    );
  }

}
