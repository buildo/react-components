import React from 'react';
import cx from 'classnames';
import { props, t, skinnable } from '../utils';
import omit from 'lodash/omit';
import ModalPortal, { Props as ModalPortalProps } from './ModalPortal';
import FlexView from '../flex/FlexView';
import BackgroundDimmer from '../background-dimmer';

const ModalProps = {
  children: t.ReactChildren,
  title: t.maybe(t.String),
  footer: t.maybe(t.ReactChildren),
  iconClose: t.maybe(t.ReactChildren),
  overlay: t.interface({
    color: t.maybe(t.String),
    alpha: t.maybe(t.Number)
  }),
  dismissOnClickOutside: t.maybe(t.Boolean),
  onDismiss: t.maybe(t.Function),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
};

export const Props = {
  ...ModalPortalProps,
  ...ModalProps
};

@skinnable()
@props(Props)
export default class Modal extends React.Component {

  static defaultProps = {
    onDismiss: () => {},
    dismissOnClickOutside: true,
    overlay: {
      color: 'black',
      alpha: 0.85
    }
  };

  getLocals() {
    const { className, ...props } = this.props;
    return {
      ...props,
      modalPortalProps: {
        ...omit(props, Object.keys(ModalProps)),
        className: cx('modal', className)
      }
    };
  }

  template({
    children, title, iconClose, footer,
    dismissOnClickOutside, onDismiss, overlay,
    style, id, modalPortalProps
  }) {
    return (
      <ModalPortal {...modalPortalProps}>
        <BackgroundDimmer
          {...{ ...overlay, style, id }}
          onClickOutside={dismissOnClickOutside ? onDismiss : undefined}
          maxWidth={950}
        >
          <FlexView className='modal-content' column grow >
            <FlexView className='modal-header' shrink={false} vAlignContent='center'>
              <FlexView className={cx('modal-title')} grow>
                {title}
              </FlexView>
              {iconClose && (
                <FlexView
                  className='modal-icon-close'
                  shrink={false}
                  marginLeft='auto'
                  onClick={onDismiss}
                >
                 {iconClose}
                </FlexView>
              )}
            </FlexView>
            <FlexView className='modal-body' column grow>
              {children}
            </FlexView>
            <FlexView className='modal-footer' column shrink={false}>
              {footer}
            </FlexView>
          </FlexView>
        </BackgroundDimmer>
      </ModalPortal>
    );
  }
}
