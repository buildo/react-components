import React from 'react';
import cx from 'classnames';
import every from 'lodash/every';
import { pure, skinnable, props, t, stateClassUtil } from '../utils';
import _TextOverflow from '../text-overflow/TextOverflow';
import FlexView from '../flex/FlexView';
import Icon from '../Icon/Icon';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

// types
export const buttonStates = ['ready', 'not-allowed', 'processing', 'error', 'success'];
const ButtonState = t.enums.of(buttonStates, 'ButtonState');
export const buttonTypes = ['default', 'primary',  'positive', 'negative', 'flat'];
const ButtonType = t.enums.of(buttonTypes, 'ButtonType');
export const buttonSizes = ['tiny', 'small', 'medium'];
const ButtonSize = t.enums.of(buttonSizes, 'ButtonState');

// util
const notBoth = (a, b) => !(a && b);
const satisfyAll = (...conditions) => (props) => every(conditions.map(condition => condition(props)));

// invariants
const propsInvariants = [
  ({ label, icon, children }) => notBoth(label || icon, children), // notBothChildrenAndLabelOrIcon
  ({ primary, flat }) => notBoth(primary, flat), // notBothFlatAndPrimary
  ({ fluid, circular }) => notBoth(fluid, circular), // notFluidAndCircular
  ({ circular, icon, label }) => !circular || (icon && !label), // circularOnlyIfIconAndNotLabel
  ({ type, primary, flat }) => notBoth(type, flat || primary) // notTypeAndItsShortucts
];

export const ButtonPropTypes = {
  /**
  * ready, not-allowed, processing, success, error; overrides `baseState`, use it if you want button to be a functional component
  */
  buttonState: t.maybe(ButtonState),
  /**
  * callback
  */
  onClick: t.Func,
  /**
  * can be a String, or a dictionary { [buttonState]: String }, t.maybe(t.union([t.Str,  stringForButtonStates])
  */
  label: t.maybe(t.union([t.String, t.Object])),
  /**
  * can be a String referring to an icon, or a dictionary { [buttonState]: String },t.maybe(t.union([t.Str, stringForButtonStates]))
  */
  icon: t.maybe(t.union([t.String, t.Object])),
  /**
  * otherwise just pass children
  */
  children: t.maybe(t.ReactChildren),
  /**
  * type of the button
  */
  type: t.maybe(ButtonType),
  /**
  * shortcut for type
  */
  primary: t.maybe(t.Boolean),
  /**
  * shortcut for type,
  */
  flat: t.maybe(t.Boolean),
  /**
  * size of the button, one of 'tiny', 'small', 'medium'
  */
  size: t.maybe(ButtonSize),
  /**
  * fluid (block) button, takes the width of the container
  */
  fluid: t.maybe(t.Boolean),
  /**
  * circular button, only if it's an icon only button
  */
  circular: t.maybe(t.Boolean),
  /**
  * function to handle the overflow of too long labels, replacing with ellipsed string and tooltip
  */
  textOverflow: t.maybe(t.Function),
  /**
  * custom style
  */
  style: t.maybe(t.Object),
  /**
  * adds a className to top-level tag
  */
  className: t.maybe(t.String)
};

const ButtonProps = t.refinement(t.struct(ButtonPropTypes), satisfyAll(...propsInvariants), 'ButtonProps');

const defaultProps = {
  textOverflow: _TextOverflow,
  buttonState: 'ready',
  size: 'medium',
  stableSuccess: false,
  timerMillis: 2000,
  fluid: false,
  primary: false,
  circular: false,
  icon: '',
  className: '',
  style: {}
};

@pure
@skinnable()
@props(ButtonProps)
export default class Button extends React.Component {

  static defaultProps = defaultProps;

  getLocals() {

    const { size, style, textOverflow, fluid, circular, onClick, buttonState } = this.props;

    const defaultLabels = { // TODO this should be easily overriden
      success: 'success',
      error: 'error',
      processing: 'processing'
    };

    const defaultIcons = {
      success: 'validate',
      error: 'exclamation'
    };

    const makeProp = x => ( typeof x === 'string' ? { ready: x, 'not-allowed': x } : x ); // todo check if this works with children

    const labels = {
      ...defaultLabels,
      ...makeProp(this.props.label || this.props.children)
    };

    const icons = {
      ...defaultIcons,
      ...makeProp(this.props.icon)
    };

    const getButtonType = () => {
      const { type, primary, flat } = this.props;
      return type || (primary && 'primary') || (flat && 'flat') || 'default';
    };

    const wrapperStyle = {
      display: fluid ? 'block' : 'inline-block',
      width: fluid ? '100%' : null
    };

    const isIconButton = () => this.props.icon && !this.props.label;

    const className = cx(
      stateClassUtil(getButtonType()),
      { 'icon-button': isIconButton() },
      { circular },
      stateClassUtil(size),
      this.props.className
    );

    const label = labels[buttonState];
    const icon = icons[buttonState];
    const loading = buttonState === 'processing';

    return {
      buttonState,
      onClick,
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
    <FlexView className='button-loading' style={{ position: 'relative' }} shrink={false} vAlignContent='center' hAlignContent='center'>
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
      <TextOverflow label={label} popover={{ offsetY: -8 }}/>
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
