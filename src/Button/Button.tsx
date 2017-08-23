import * as React from 'react';
import cx from '../utils/classnames';
import every = require('lodash/every');
import { props, t, stateClassUtil } from '../utils';
import _TextOverflow from '../TextOverflow/TextOverflow';
import { PopoverProps } from '../Popover/Popover';
import { ObjectOverwrite } from 'typelevel-ts';
import FlexView from 'react-flexview';
import Icon from '../Icon/Icon';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export namespace ButtonProps {

  export type ButtonState = 'ready' | 'not-allowed' | 'processing' | 'error' | 'success';
  export type ButtonType = 'default' | 'primary' | 'positive' | 'negative' | 'flat';
  export type ButtonSize = 'tiny' | 'small' | 'medium';

}

// TODO: TextOverflow should accept a popoverProps
export type TextOverflowCompatibleComponent = React.ComponentClass<{
  label?: string | number,
  popover?: ObjectOverwrite<PopoverProps.Popover, {
    position?: PopoverProps.Position,
    content?: void & string
  }>
}>

export interface ButtonProps {
  /** callback */
  onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void,
  /** ready, not-allowed, processing, success, error; overrides `baseState`, use it if you want button to be a functional component */
  buttonState?: ButtonProps.ButtonState,
  /** can be a String, or a dictionary { [buttonState]: String }, t.maybe(t.union([t.Str,  stringForButtonStates]) */
  label?: string | { [key in ButtonProps.ButtonState]?: string },
  /** can be a String referring to an icon, or a dictionary { [buttonState]: String },t.maybe(t.union([t.Str, stringForButtonStates])) */
  icon?: string | { [key in ButtonProps.ButtonState]?: string },
  /** otherwise just pass a string as children */
  children?: string,
  /** type of the button (default, primary, positive, negative, flat) */
  type?: ButtonProps.ButtonType,
  /** shortcut for type "primary" */
  primary?: boolean,
  /** shortcut for type "flat" */
  flat?: boolean,
  /** size of the button, one of 'tiny', 'small', 'medium' */
  size?: ButtonProps.ButtonSize,
  /** fluid - fluid (block) button, takes the width of the container */
  fluid?: boolean,
  /** circular - circular button, this is allowed only if it's an icon button */
  circular?: boolean,
  /** textOverflow - function to handle the overflow of too long labels, replacing with ellipsed string and tooltip */
  textOverflow?: TextOverflowCompatibleComponent,
  style?: React.CSSProperties,
  className?: string
}

export type ButtonPropTypes = ButtonProps;

export type ButtonPropsDefaults = {
  textOverflow: TextOverflowCompatibleComponent,
  buttonState: ButtonProps.ButtonState,
  size: ButtonProps.ButtonSize,
  fluid: boolean,
  primary: boolean,
  circular: boolean,
  icon: string,
  className: string,
  style: object
};

type ButtonPropsWithDefaults = ButtonProps & ButtonPropsDefaults;

// types
export const buttonStates: ButtonProps.ButtonState[] = ['ready', 'not-allowed', 'processing', 'error', 'success'];
const ButtonState = t.enums.of(buttonStates, 'ButtonState');
export const buttonTypes: ButtonProps.ButtonType[] = ['default', 'primary', 'positive', 'negative', 'flat'];
const ButtonType = t.enums.of(buttonTypes, 'ButtonType');
export const buttonSizes: ButtonProps.ButtonSize[] = ['tiny', 'small', 'medium'];
const ButtonSize = t.enums.of(buttonSizes, 'ButtonSize');

// util
const notBoth = (a: any, b: any): boolean => !(a && b);
const satisfyAll = (...conditions: Array<(props: Partial<ButtonProps>) => boolean>) => (props: ButtonProps) => every(conditions, c => c(props));

// invariants
const propsInvariants: Array<(props: Partial<ButtonProps>) => boolean> = [
  ({ label, icon, children }) => notBoth(label || icon, children), // notBothChildrenAndLabelOrIcon
  ({ primary, flat }) => notBoth(primary, flat), // notBothFlatAndPrimary
  ({ fluid, circular }) => notBoth(fluid, circular), // notBothFluidAndCircular
  ({ circular, icon, label }) => !circular || !!(icon && !label), // circularOnlyIfIconAndNotLabel
  ({ type, primary, flat }) => notBoth(type, flat || primary) // notBothTypeAndItsShortucts
];

export const ButtonPropTypes = {
  buttonState: t.maybe(ButtonState),
  onClick: t.Function,
  label: t.maybe(t.union([t.String, t.Object])),
  icon: t.maybe(t.union([t.String, t.Object])),
  children: t.maybe(t.String),
  type: t.maybe(ButtonType),
  primary: t.maybe(t.Boolean),
  flat: t.maybe(t.Boolean),
  size: t.maybe(ButtonSize),
  fluid: t.maybe(t.Boolean),
  circular: t.maybe(t.Boolean),
  textOverflow: t.maybe(t.Function),
  style: t.maybe(t.Object),
  className: t.maybe(t.String)
};

export const Props = t.refinement(t.struct(ButtonPropTypes), satisfyAll(...propsInvariants), 'ButtonProps');

const defaultLabels = {
  success: 'success',
  error: 'error',
  processing: 'processing'
};

const defaultIcons = {
  success: 'validate',
  error: 'exclamation'
};

const makeProp = (x: any) => (t.String.is(x) ? { ready: x, 'not-allowed': x } : x); // todo check if this works with children

@props(Props)
export default class Button extends React.PureComponent<ButtonProps> {

  static defaultProps: ButtonPropsDefaults = {
    textOverflow: _TextOverflow,
    buttonState: 'ready' as ButtonProps.ButtonState,
    size: 'medium' as ButtonProps.ButtonSize,
    fluid: false,
    primary: false,
    circular: false,
    icon: '',
    className: '',
    style: {}
  };

  templateLoading = () => (
    <FlexView className='button-loading' shrink={false} vAlignContent='center' hAlignContent='center'>
      <LoadingSpinner size='1em' overlayColor='transparent' />
    </FlexView>
  );

  templateIcon = (icon: string) => (
    <FlexView className='button-icon' shrink={false}>
      <Icon icon={icon} />
    </FlexView>
  );

  // TODO: the popover props is not handled by TextOverflow
  templateLabel = (label: string, TextOverflow: TextOverflowCompatibleComponent) => (
    <FlexView className='button-label' column shrink={false} vAlignContent='center' hAlignContent='center'>
      <TextOverflow label={label} popover={{ offsetY: -8 }} />
    </FlexView>
  );

  render() {

    const {
      buttonState,
      circular,
      className: _className,
      flat,
      fluid,
      icon: _icon,
      label: _label, children,
      onClick,
      primary,
      size,
      style,
      textOverflow,
      type
    } = this.props as ButtonPropsWithDefaults;

    const labels = {
      ...defaultLabels,
      ...makeProp(_label || children)
    };

    const icons = {
      ...defaultIcons,
      ...makeProp(_icon)
    };

    const getButtonType = () => type || (primary && 'primary') || (flat && 'flat') || 'default';

    const wrapperStyle = {
      display: fluid ? 'block' : 'inline-block',
      width: fluid ? '100%' : null
    };

    const isIconButton = () => _icon && !_label;

    const className = cx(
      stateClassUtil(getButtonType()),
      { 'icon-button': isIconButton() },
      { circular },
      stateClassUtil(size),
      _className
    );

    const label = labels[buttonState];
    const icon = icons[buttonState];
    const loading = buttonState === 'processing';

    return (
      <div className='button' style={wrapperStyle}>
        <FlexView
          className={cx('button-inner', className, stateClassUtil(buttonState))}
          vAlignContent='center'
          hAlignContent='center'
          onClick={buttonState === 'ready' ? onClick : () => {}}
          style={style}
        >
          {loading && this.templateLoading()}
          {icon && this.templateIcon(icon)}
          {label && this.templateLabel(label, textOverflow)}
        </FlexView>
      </div>
    );
  }

}
