import * as React from "react";
import * as cx from 'classnames';
import { props, t } from "../utils";
import {
  InputRequiredProps,
  InputDefaultProps,
  Props as InputPropsT,
  Input
} from "../Input/Input";

const ValidNumberRegExp = /^\d+([,.]\d+)?$/;
const ValidNumberRegExpB = /^(\d+)?([,.])?(\d+)?$/;
const ValidNumberRegExpC = /^[0-9,.+-]+?(e[0-9,.+-]+)?$/;
// const ChromeRegExp = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/;

export type NumberInputRequiredProps = InputRequiredProps & {
  defaultValue?: number;
  value?: number;
  onChange: (value?: number) => void;
};

export type NumberInputDefaultProps = InputDefaultProps;

export namespace NumberInput {
  export type Props = NumberInputRequiredProps &
    Partial<NumberInputDefaultProps>;
}
type NumberInputDefaultedProps = NumberInputRequiredProps &
  NumberInputDefaultProps;

export const Props = {
  ...InputPropsT,
  value: t.maybe(t.Number)
};

// @props(Props, { strict: false })
class A extends React.PureComponent<NumberInput.Props, { value: string }> {
  static defaultProps: NumberInputDefaultProps = {
    disabled: false
  };

  state = {
    value: typeof props.value === "number" ? String(props.value) : ""
  };

  onChange = (value: string): void => {
    this.setState({ value });

    if (value.length === 0) {
      this.props.onChange(undefined);
    } else if (ValidNumberRegExp.test(value)) {
      this.props.onChange(parseFloat(value));
    }
  };

  render() {
    const { ...props } = this.props as NumberInputDefaultedProps;
    const inputProps = {
      ...props,
      value: this.state.value,
      onChange: this.onChange,
      type: "text",
      className: "number-input"
    };

    return <Input {...inputProps} />;
  }
}

class B extends React.PureComponent<NumberInput.Props, { value: string }> {
  static defaultProps: NumberInputDefaultProps = {
    disabled: false
  };

  state = {
    value: typeof props.value === "number" ? String(props.value) : ""
  };

  onChange = (value: string): void => {
    if ((/^[.,]?$/).test(value)) {
      this.setState({ value });
      this.props.onChange(undefined);
    } else if (ValidNumberRegExpB.test(value)) {
      this.setState({ value });
      this.props.onChange(parseFloat(value.replace(/,/g, ".")));
    }
  };

  render() {
    const { ...props } = this.props as NumberInputDefaultedProps;
    const inputProps = {
      ...props,
      value: this.state.value,
      onChange: this.onChange,
      type: "text",
      className: "number-input"
    };

    return <Input {...inputProps} />;
  }
}

class C extends React.PureComponent<NumberInput.Props, { value: string }> {
  static defaultProps: NumberInputDefaultProps = {
    disabled: false
  };

  state = {
    value: typeof props.value === "number" ? String(props.value) : ""
  };

  onChange = (value: string): void => {
    this.setState({ value });

    if (value.length === 0) {
      this.props.onChange(undefined);
    } else if (ValidNumberRegExpC.test(value)) {
      this.props.onChange(parseFloat(value));
    }
  };

  isValid = () => {
    return !isNaN(parseFloat(this.state.value));
  }

  render() {
    const { ...props } = this.props as NumberInputDefaultedProps;

    const isValid = this.isValid();

    console.log({ isValid })

    const inputProps = {
      ...props,
      value: this.state.value,
      onChange: this.onChange,
      type: "text",
      className: cx("number-input", { 'is-valid': isValid })
    };

    return <Input {...inputProps} />;
  }
}

export const NumberInput = (props: any) => {
  if (props.A) {
    return <A {...props} />
  } else if (props.B) {
    return <B {...props} />
  } else if (props.C) {
    return <C {...props} />
  }
}

