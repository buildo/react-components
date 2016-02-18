import React from 'react';
import cx from 'classnames';
import { pure, skinnable, props, t } from '../utils';
import { buttonState } from './ButtonLogic';
import FlexView from '../flex/FlexView';
import Icon from '../Icon/Icon';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import _TextOverflow from '../text-overflow/TextOverflow';

export const stringForButtonStates = t.struct({
  ready: t.maybe(t.Str),
  loading: t.maybe(t.Str),
  error: t.maybe(t.Str),
  success: t.maybe(t.Str),
  'not-allowed': t.maybe(t.Str)
}, 'stringForButtonStates');

@pure
@skinnable()
@props({
  buttonState,
  onClick: t.Func,
  label: stringForButtonStates,
  icon: stringForButtonStates,
  className: t.Str,
  style: t.Obj,
  textOverflow: t.maybe(t.Function)
})
export default class ButtonRenderer extends React.Component {

  static defaultProps = {
    textOverflow: _TextOverflow
  };

  getLocals() {
    const { buttonState, label: labelProp, icon: iconProp, textOverflow } = this.props;
    const label = labelProp[buttonState];
    const icon = iconProp[buttonState];
    const loading = buttonState === 'processing';
    const style = { width: '100%', ...this.props.style };
    return {
      ...this.props,
      label,
      icon,
      loading,
      style,
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

  template({ onClick, buttonState, icon, label, loading, className, style, TextOverflow }) {
    return (
      <FlexView className={cx('button', className, buttonState)} {...{ onClick, style }} vAlignContent='center' hAlignContent='center' shrink={false}>
        {loading && this.templateLoading()}
        {icon && this.templateIcon({ icon })}
        {label && this.templateLabel({ label, TextOverflow })}
      </FlexView>
    );
  }

}
