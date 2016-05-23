import React from 'react';
import cx from 'classnames';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure } from 'revenge';
import FlexView from '../flex/FlexView';
import Icon from '../Icon/Icon';
import BackgroundDimmer from '../background-dimmer';
import TransitionWrapper from '../transition-wrapper';

class ContextWrapper extends React.Component {
  getChildContext = () => this.props.context;
  render = () => this.props.modal();
}

@pure
@props({
  children: t.ReactNode,
  title: t.maybe(t.String),
  footer: t.maybe(t.ReactNode),
  closeIcon: t.maybe(t.Boolean),
  dismissOnClickOut: t.maybe(t.Boolean),
  onDismiss: t.maybe(t.Function),
  className: t.maybe(t.String),
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number
})
export default class Modal extends React.Component { //eslint-disable-line react/no-multi-comp
  static defaultProps = {
    onDismiss: () => {},
    title: '',
    dismissOnClickOut: false,
    closeIcon: true
  };

  render() {
    return null;
  }

  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.removeModal = true;
    this._render();

    const { transitionLeaveTimeout } = this.props;
    setTimeout(() => this._cleanup(), transitionLeaveTimeout + 50);
  }

  _cleanup() {
    if (this.containerNode) {
      React.unmountComponentAtNode(this.containerNode);
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  }

  _render() {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div');
      document.body.appendChild(this.containerNode);
    }

    const Modal = this._renderModal();

    React.render(<ContextWrapper modal={Modal} />, this.containerNode);
  }

  _renderModal() {
    const {
      props: {
        children, title, closeIcon, className, footer, dismissOnClickOut,
        onDismiss,
        transitionEnterTimeout, transitionLeaveTimeout
      }
    } = this;
    const titleProps = {
      h3: {
        className: closeIcon ? 'with-close-icon' : null
      }
    };

    return () => (
      <React.addons.TransitionGroup transitionAppear>
        {!this.removeModal ? (
          <TransitionWrapper key={0}
            className={cx('modal', className)}
            transitionEnterTimeout={transitionEnterTimeout}
            transitionLeaveTimeout={transitionLeaveTimeout}
          >
            <FlexView>
              <BackgroundDimmer
                color='black'
                alpha={0.85}
                onClickOutside={dismissOnClickOut ? onDismiss : (() => {})}
                maxWidth={950}
              >
                <FlexView column grow className='modal-content'>
                  <FlexView
                    className='modal-header'
                    shrink={false}
                    vAlignContent='center'
                  >
                    <h3 className={cx('modal-title', titleProps.h3.className)}>
                      {title}
                    </h3>
                    {closeIcon && (
                      <Icon className='close-icon' icon='modal-times' onClick={onDismiss} />
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
            </FlexView>
          </TransitionWrapper>
        ) : null}
      </React.addons.TransitionGroup>
    );
  }
}
