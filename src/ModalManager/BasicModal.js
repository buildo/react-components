import React from 'react';
import cx from '../utils/classnames';
import { props, t } from '../utils';
import BackgroundDimmer from '../BackgroundDimmer/BackgroundDimmer';

export const Props = {
  children: t.ReactElement,
  iconClose: t.maybe(t.ReactElement),
  onDismiss: t.maybe(t.Function),
  background: t.maybe(t.struct({
    color: t.maybe(t.String),
    alpha: t.maybe(t.Number),
    stopScrollPropagation: t.maybe(t.Boolean)
  })),
  style: t.maybe(t.Object),
  className: t.maybe(t.String),
  id: t.maybe(t.String)
};

@props(Props)
export default class BasicModal extends React.Component {

  getBackgroundProp = () => {
    return {
      color: 'black',
      alpha: 0.8,
      stopScrollPropagation: true,
      ...this.props.background
    };
  };

  getIconClose = () => {
    const { iconClose, onDismiss } = this.props;
    if (iconClose) {
      return iconClose;
    }

    const style = {
      position: 'absolute',
      color: '#F0F0F0',
      right: -25,
      top: -25,
      width: 'auto',
      height: 'auto',
      margin: 0,
      padding: 0,
      fontSize: 25
    };
    return <i className='icon-close' style={style} onClick={onDismiss} />;
  };

  render() {
    const { children, onDismiss, className, id, style } = this.props;
    return (
      <BackgroundDimmer
        {...this.getBackgroundProp()}
        {...{ id, style }}
        className={cx('modal', className, { 'is-dismissable': !!onDismiss })}
        onClickOutside={onDismiss}
      >
        {onDismiss && this.getIconClose()}
        <div className='modal-body'>
          {children}
        </div>
      </BackgroundDimmer>
    );
  }

}
