import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import FlexView from '../flex/FlexView';
import TransitionWrapper from '../transition-wrapper/TransitionWrapper';
import BackgroundDimmer from '../background-dimmer/BackgroundDimmer';

const ModalManager = React.createClass({

  propTypes: {
    activeModal: React.PropTypes.string,
    data: React.PropTypes.object,
    modals: React.PropTypes.array.isRequired,
    onClickOutside: React.PropTypes.func,
    stopScrollPropagation: React.PropTypes.bool,
    transitionStyles: React.PropTypes.object,
    transitionEnterTimeout: React.PropTypes.number,
    transitionLeaveTimeout: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      transitionStyles: {},
      transitionEnterTimeout: 0,
      transitionLeaveTimeout: 0,
      stopScrollPropagation: true
    };
  },

  componentDidMount() {
    this.appendModalContainer();
    this.renderModals();
  },

  componentWillUnmount() {
    this.removeModalContainer();
  },

  getModals() {
    const {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      activeModal,
      data,
      modals,
      onClickOutside,
      stopScrollPropagation
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

    return modals.filter(m => m.id === activeModal).map(m => {
      return (
        <TransitionWrapper {...props} key={m.id}>
          <BackgroundDimmer {...{ stopScrollPropagation, onClickOutside }}>
            <m.modal {...data} />
          </BackgroundDimmer>
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
          {this.getModals()}
        </ReactTransitionGroup>
      </div>
    );
  },

  renderModals() {
    React.render(this.getModalManager(), this.containerNode);
  },

  render() {
    return null;
  },

  componentDidUpdate() {
    this.renderModals();
  }

});

export default ModalManager;
