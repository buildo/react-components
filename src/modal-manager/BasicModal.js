import React from 'react';
import cx from 'classnames';
import BackgroundDimmer from '../background-dimmer';

export default class BasicModal extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    iconClose: React.PropTypes.element,
    onDismiss: React.PropTypes.func,
    background: React.PropTypes.shape({
      color: React.PropTypes.string,
      alpha: React.PropTypes.number,
      stopScrollPropagation: React.PropTypes.bool
    }),
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string
  }

  getBackgroundProp = () => {
    return {
      color: 'black',
      alpha: 0.8,
      stopScrollPropagation: true,
      ...this.props.background
    };
  }

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
  }

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
