import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import { props, t } from '../utils';
import TransitionWrapper from '../transition-wrapper';

let containerNode = null;

export const Props = {
  children: t.ReactChildren,
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number,
  className: t.maybe(t.String),
  childContextTypes: t.maybe(t.Object),
  getChildContext: t.maybe(t.Function)
};

@props(Props)
export default class ModalPortal extends React.Component {

  render() {
    return null;
  }

  _ContextWrapper = (() => {
    const childContextTypes = this.props.childContextTypes || {};
    return class ContextWrapper extends React.Component { // eslint-disable-line react/no-multi-comp
      static childContextTypes = childContextTypes;
      getChildContext = this.props.getChildContext || (() => ({}));
      render() {
        return this.props.modal();
      }
    };
  })();

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
    if (containerNode) {
      ReactDOM.unmountComponentAtNode(containerNode);
      document.body.removeChild(containerNode);
      containerNode = null;
    }
  }

  _onLeave = () => setTimeout(this._cleanup) // setTimeout is needed to avoid conflicts with ReactTransitionGroup setState

  _render() {
    if (!containerNode) {
      containerNode = document.createElement('div');
      document.body.appendChild(containerNode);
    }

    const modal = this._renderModal();
    const ContextWrapper = this._ContextWrapper;
    ReactDOM.render(<ContextWrapper modal={modal} />, containerNode);
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
            onLeave={this._onLeave}
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
