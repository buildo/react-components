import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import FlexView from '../flex/FlexView';
import TransitionWrapper from '../transition-wrapper/TransitionWrapper';

const ModalManager = React.createClass({

  propTypes: {
    children: React.PropTypes.element,
    transitionStyles: React.PropTypes.object,
    transitionEnterTimeout: React.PropTypes.number,
    transitionLeaveTimeout: React.PropTypes.number,
    getChildContext: React.PropTypes.func,
    childContextTypes: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      transitionStyles: {},
      transitionEnterTimeout: 0,
      transitionLeaveTimeout: 0,
      childContextTypes: {},
      getChildContext: () => ({})
    };
  },

  componentDidMount() {
    this.appendModalContainer();
    this.renderModals();
  },

  componentWillUnmount() {
    this.removeModalContainer();
  },

  logWarning(log) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(log);
    }
  },

  getModal() {
    const {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      children
    } = this.props;

    const props = {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      style: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999
      },
      className: 'modal-wrapper',
      component: FlexView,
      vAlignContent: 'center',
      hAlignContent: 'center'
    };

    return [].concat(children).filter(e => !!e).map(el => {
      if (!el.key) {
        this.logWarning('Each modal should have a unique "key" prop');
      }
      return (
        <TransitionWrapper {...props} key={el.key}>
            {children}
        </TransitionWrapper>
      );
    });
  },

  appendModalContainer() {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div');
      document.body.appendChild(this.containerNode);
    }
  },

  removeModalContainer() {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  },

  getModalManager() {
    return (
      <div>
        <ReactTransitionGroup>
          {this.getModal()}
        </ReactTransitionGroup>
      </div>
    );
  },

  renderModals() {
    const Modal = this.getModalManager();
    const ContextWrapper = React.createClass({
      childContextTypes: this.props.childContextTypes,
      getChildContext: this.props.getChildContext,
      render() {
        return Modal;
      }
    });
    React.render(<ContextWrapper />, this.containerNode);
  },

  render() {
    return null;
  },

  componentDidUpdate() {
    this.renderModals();
  }

});

export default ModalManager;
