import React from 'react';
import cx from 'classnames';
import every from 'lodash/every';
import { pure, skinnable, props, t, stateClassUtil } from '../utils';
import _TextOverflow from '../text-overflow/TextOverflow';
import FlexView from 'react-flexview';
import Icon from '../Icon/Icon';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

// types
export const buttonStates = ['ready', 'not-allowed', 'processing', 'error', 'success'];
const ButtonState = t.enums.of(buttonStates, 'ButtonState');
export const buttonTypes = ['default', 'primary', 'positive', 'negative', 'flat'];
const ButtonType = t.enums.of(buttonTypes, 'ButtonType');
export const buttonSizes = ['tiny', 'small', 'medium'];
const ButtonSize = t.enums.of(buttonSizes, 'ButtonSize');

// util
const notBoth = (a, b) => !(a && b);
const satisfyAll = (...conditions) => (props) => every(conditions, c => c(props));

// invariants
const propsInvariants = [
  ({ label, icon, children }) => notBoth(label || icon, children), // notBothChildrenAndLabelOrIcon
  ({ primary, flat }) => notBoth(primary, flat), // notBothFlatAndPrimary
  ({ fluid, circular }) => notBoth(fluid, circular), // notBothFluidAndCircular
  ({ circular, icon, label }) => !circular || (icon && !label), // circularOnlyIfIconAndNotLabel
  ({ type, primary, flat }) => notBoth(type, flat || primary) // notBothTypeAndItsShortucts
];

export const ButtonPropTypes = {
  buttonState: t.maybe(ButtonState),
  onClick: t.Func,
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

const defaultProps = {
  textOverflow: _TextOverflow,
  buttonState: 'ready',
  size: 'medium',
  fluid: false,
  primary: false,
  circular: false,
  icon: '',
  className: '',
  style: {}
};

const defaultLabels = {
  success: 'success',
  error: 'error',
  processing: 'processing'
};

const defaultIcons = {
  success: 'validate',
  error: 'exclamation'
};

const makeProp = x => (t.String.is(x) ? { ready: x, 'not-allowed': x } : x); // todo check if this works with children

/** A stateful button element
 * @param buttonState - ready, not-allowed, processing, success, error; overrides `baseState`, use it if you want button to be a functional component
 * @param onClick - callback
 * @param label - can be a String, or a dictionary { [buttonState]: String }, t.maybe(t.union([t.Str,  stringForButtonStates])
 * @param icon - can be a String referring to an icon, or a dictionary { [buttonState]: String },t.maybe(t.union([t.Str, stringForButtonStates]))
 * @param children - otherwise just pass a string as children
 * @param type - type of the button (default, primary, positive, negative, flat)
 * @param primary - shortcut for type "primary"
 * @param flat - shortcut for type "flat"
 * @param size - size of the button, one of 'tiny', 'small', 'medium'
 * @param fluid - fluid (block) button, takes the width of the container
 * @param circular - circular button, this is allowed only if it's an icon button
 * @param textOverflow - function to handle the overflow of too long labels, replacing with ellipsed string and tooltip

 */
@pure
@skinnable()
@props(Props)
export default class Button extends React.Component {

  static defaultProps = defaultProps;

  getLocals({
    size,
    style,
    textOverflow,
    fluid,
    type, primary, flat,
    circular,
    onClick,
    buttonState,
    icon: _icon,
    label: _label,
    className: _className,
    children
  }) {

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

    return {
      buttonState,
      onClick: buttonState === 'ready' ? onClick : () => {},
      style,
      wrapperStyle,
      className,
      label,
      icon,
      loading,
      TextOverflow: textOverflow
    };
  }

  templateLoading = () => (
    <FlexView className='button-loading' shrink={false} vAlignContent='center' hAlignContent='center'>
      <LoadingSpinner size='1em' overlayColor='transparent' />
    </FlexView>
  );

  templateIcon = ({ icon }) => (
    <FlexView className='button-icon' shrink={false}>
      <Icon icon={icon} />
    </FlexView>
  );

  templateLabel = ({ label, TextOverflow }) => (
    <FlexView className='button-label' column shrink={false} vAlignContent='center' hAlignContent='center'>
      <TextOverflow label={label} popover={{ offsetY: -8 }} />
    </FlexView>
  );

  template({ onClick, buttonState, icon, label, loading, className, style, TextOverflow, wrapperStyle }) {
    return (
      <div className='button' style={wrapperStyle}>
        <FlexView
          className={cx('button-inner', className, stateClassUtil(buttonState))}
          vAlignContent='center'
          hAlignContent='center'
          onClick={onClick}
          style={style}
        >
          {loading && this.templateLoading()}
          {icon && this.templateIcon({ icon })}
          {label && this.templateLabel({ label, TextOverflow })}
        </FlexView>
      </div>
    );
  }

}
