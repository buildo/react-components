import React from 'react';
import cx from '../utils/classnames';
import { props, t, skinnable } from '../utils';
import omit from 'lodash.omit';
import ModalPortal, { Props as ModalPortalProps } from './ModalPortal';
import FlexView from 'react-flexview';
import BackgroundDimmer from '../BackgroundDimmer';

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

/** Render a modal window over a dimmed layer
 * @param children - modal content
 * @param title - modal title
 * @param footer - modal footer
 * @param iconClose - close icon
 * @param overlay - specify 'color' and 'alpha' for the overlay layer
 * @param dismissOnClickOutside - whether the modal should be dismissed when clicking outside it
 * @param onDismiss - called when modal is dismissed
 * @param transitionEnterTimeout - transition enter timeout
 * @param transitionLeaveTimeout - transition leave timeout
 * @param childContextTypes: context types to pass to the modal React tree
 * @param getChildContext: should return context values to pass to the modal React tree
 */
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
    const { className, title, iconClose, footer, ...props } = this.props;
    return {
      ...props,
      shouldRenderHeader: !!title || !!iconClose,
      title, iconClose,
      shouldRenderFooter: !!footer,
      footer,
      modalPortalProps: {
        ...omit(props, Object.keys(ModalProps)),
        className: cx('modal', className)
      }
    };
  }

  template({
    shouldRenderHeader, title, iconClose,
    children,
    shouldRenderFooter, footer,
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
            {shouldRenderHeader && (
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
            )}
            <FlexView className='modal-body' column grow>
              {children}
            </FlexView>
            {shouldRenderFooter && (
              <FlexView className='modal-footer' column shrink={false}>
                {footer}
              </FlexView>
            )}
          </FlexView>
        </BackgroundDimmer>
      </ModalPortal>
    );
  }
}
