import * as React from 'react';
import cx from '../utils/classnames';
import { props, t } from '../utils';
import omit = require('lodash/omit');
import * as InputChildren from 'react-input-children';
import FlexView from 'react-flexview';
import Icon from '../Icon/Icon';

export type ConfirmationInputRequiredProps = {
  /** input placeholder */
  placeholder?: string,
  /** labels for 'clear' and 'toConfirm' buttons */
  text: {
    clear?: string,
    toConfirm?: string
  },
  /** icons for 'clear' and 'toConfirm' buttons */
  icon: {
    clear?: string,
    toConfirm?: string
  },
  /** an optional class name to pass to top level element of the component */
  className?: string,
  /** component's id */
  id?: string,
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties
};

export type ConfirmationInputDefaultProps = {
  /** initial value */
  initialValue: string,
  /** true if disabled */
  disabled: boolean,
  /** called when input box content is changed */
  onChange: (value: string) => void,
  /** called when confirming input content */
  onConfirm: (value: string) => void,
  /** called when clearing confirmed content */
  onClear: () => void,
};

export type ConfirmationInputProps = ConfirmationInputRequiredProps & Partial<ConfirmationInputDefaultProps>;
type ConfirmationInputDefaultedProps = ConfirmationInputRequiredProps & ConfirmationInputDefaultProps;

export const Props = {
  initialValue: t.maybe(t.String),
  onChange: t.maybe(t.Function),
  onConfirm: t.maybe(t.Function),
  onClear: t.maybe(t.Function),
  placeholder: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
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
};

export type ConfirmationInputState = {
  focused: boolean,
  hoveringConfirm: boolean,
  value: string
}

export type ConfirmProps = {
  text?: string,
  icon?: string,
  onMouseDown: () => void,
  onMouseEnter: () => void,
  onMouseLeave: () => void
} | undefined

@props(Props, { strict: false })
export default class ConfirmationInput extends React.PureComponent<ConfirmationInputProps, ConfirmationInputState> {

  static defaultProps: ConfirmationInputDefaultProps = {
    initialValue: '',
    disabled: false,
    onChange: () => {},
    onConfirm: () => {},
    onClear: () => {}
  };

  constructor(props: ConfirmationInputProps) {
    super(props);
    this.state = {
      focused: false,
      hoveringConfirm: false,
      value: props.initialValue || ''
    };
  }

  componentWillReceiveProps({ initialValue }: ConfirmationInputProps) {
    if (initialValue !== this.props.initialValue) {
      this.setState({
        value: initialValue || ''
      });
    }
  }

  onEnter = (e: KeyboardEvent) => {
    if (e.which === 13 || e.keyCode === 13) { // if Enter key
      this._onConfirm();
      (document.activeElement as HTMLElement).blur(); // remove focus
    }
  };

  onBlur = () => {
    const { hoveringConfirm } = this.state;
    if (!hoveringConfirm) {
      this._onConfirm();
    }
    this.setState({ focused: false });
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  onMouseEnter = () => this.setState({ hoveringConfirm: true });

  onMouseLeave = () => this.setState({ hoveringConfirm: false });

  _onConfirm = () => {

    const { initialValue, onConfirm, onChange } = this.props as ConfirmationInputDefaultedProps;
    const {
      state: { value },
      onMouseLeave
    } = this;
    const confirmed = (value === initialValue) || (!value && !initialValue);

    if (!confirmed) {
      onConfirm(value);
      onChange(value);
      if (!value) {
        onMouseLeave(); // on confirm, if value is empty, `templateConfirm` disappears -> onMouseLeave never called
      }
    }
  };

  _onClear = () => {
    const { onClear, onChange } = this.props as ConfirmationInputDefaultedProps;
    onClear();
    onChange(''); // props.onChange should always receive a string
    this.onMouseLeave(); // on clear `templateConfirm` disappears -> onMouseLeave never called
  };

  _onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => this.setState({ value });

  render() {
    const {
      className,
      initialValue,
      text,
      icon,
      ...props
    } = this.props as ConfirmationInputDefaultedProps;
    const {
      state: { value, focused },
      _onClear: onClear,
      _onConfirm: onConfirm,
      _onChange: onChange,
      onMouseEnter, onMouseLeave
    } = this;
    const confirmed = (value === initialValue) || (!value && !initialValue);
    const showToConfirm = !confirmed;
    const showClear = (value && confirmed && !focused);

    const confirmProps = (showToConfirm || showClear) ? {
      text: text[confirmed ? 'clear' : 'toConfirm'],
      icon: icon[confirmed ? 'clear' : 'toConfirm'],
      wrapper: {
        style: { cursor: 'pointer' },
        className: 'confirmation',
        vAlignContent: 'center' as 'center',
        onMouseDown: showClear ? onClear : onConfirm,
        onMouseEnter,
        onMouseLeave
      }
    } : undefined;

    const inputProps = {
      ...omit(props, 'onChange', 'onConfirm', 'onClear'),
      value,
      onChange,
      onKeyUp: this.onEnter,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      wrapper: {
        className: cx('confirmation-input', { focused }, className)
      }
    };

    return (
      <InputChildren {...inputProps}>
        {confirmProps && (
          <FlexView {...confirmProps.wrapper}>
            {icon && <Icon icon={confirmProps.icon} />}
            {confirmProps.text}
          </FlexView>
        )}
      </InputChildren>
    );
  }

}
