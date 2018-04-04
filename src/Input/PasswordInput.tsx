import * as React from 'react';
import { props, t } from '../utils';
import { Input, InputRequiredProps, InputDefaultProps, Props as InputPropsT } from '../Input/Input';
import View from 'react-flexview';

export type PasswordInputRequiredProps = InputRequiredProps;

export type PasswordInputDefaultProps = InputDefaultProps & {
  /** text label for the "hide" button */
  hideText: string,
  /** text label for the "show" button */
  showText: string
};

export namespace PasswordInput {
  export type Props = PasswordInputRequiredProps & Partial<PasswordInputDefaultProps>;
}
type PasswordInputDefaultedProps = PasswordInputRequiredProps & PasswordInputDefaultProps;

export const Props = {
  ...InputPropsT,
  hideText: t.maybe(t.String),
  showText: t.maybe(t.String)
};

export type State = {
  show: boolean
}

@props(Props, { strict: false })
export class PasswordInput extends React.PureComponent<PasswordInput.Props, State> {

  static defaultProps: PasswordInputDefaultProps = {
    disabled: false,
    showText: 'Show',
    hideText: 'Hide'
  };

  state = {
    show: false
  };

  onToggleClick = () => {
    this.setState(({ show }) => ({ show: !show }));
  }

  render() {
    const props = this.props as PasswordInputDefaultedProps;
    const type = this.state.show ? 'text' : 'password';
    const text = this.state.show ? props.hideText : props.showText;
    const toggleProps = {
      onClick: this.onToggleClick,
      className: 'password-input-toggle',
      vAlignContent: 'center' as View.Props['vAlignContent']
    };
    const inputProps = {
      ...props,
      type,
      className: 'password-input'
    };

    return (
      <Input {...inputProps}>
        <View {...toggleProps}>
          {text}
        </View>
      </Input>
    );
  }

}
