import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import { props, t } from '../utils';
import TransitionWrapper from '../transition-wrapper';

class ContextWrapper extends React.Component {
  getChildContext = () => this.props.context;
  render = () => this.props.modal();
}

export const Props = {
  children: t.ReactChildren,
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number,
  className: t.maybe(t.String)
};

@props(Props)
export default class ModalPortal extends React.Component { //eslint-disable-line react/no-multi-comp

  render() {
    return null;
  }

  componentDidMount() {
    this.isOpen = true;
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.isOpen = false;
    this._render();
  }

  _cleanup() {
    if (this.containerNode) {
      ReactDOM.unmountComponentAtNode(this.containerNode);
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
    ReactDOM.render(<ContextWrapper modal={Modal} />, this.containerNode);
  }

  _renderModal() {
    const {
      className, children, transitionEnterTimeout, transitionLeaveTimeout
    } = this.props;

    return () => (
      <ReactTransitionGroup transitionAppear>
        {this.isOpen ? (
          <TransitionWrapper
            key={0}
            className={className}
            onLeave={() => setTimeout(this._cleanup)}
            transitionEnterTimeout={transitionEnterTimeout}
            transitionLeaveTimeout={transitionLeaveTimeout}
          >
            {children}
          </TransitionWrapper>
        ) : null}
      </ReactTransitionGroup>
    );
  }
}
