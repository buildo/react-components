import React from 'react';
import cx from 'classnames';
import { pure, skinnable, props, t, stateClassUtil } from '../utils';
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
  onClick: t.Function,
  label: stringForButtonStates,
  icon: stringForButtonStates,
  className: t.String,
  style: t.Object,
  wrapperStyle: t.Object,
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
    return {
      ...this.props,
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
