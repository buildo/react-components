import React from 'react';
import ModalWrapper from './ModalWrapper';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
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

    const transitionProps = {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout
    };
    const style = {
      position: 'fixed',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    };

    return modals.filter(m => m.id === activeModal).map(m => {
      return (
        <ModalWrapper {...transitionProps} style={style} className='modal-wrapper' key={m.id}>
          <BackgroundDimmer {...{ stopScrollPropagation, onClickOutside }}>
            <m.modal {...data} />
          </BackgroundDimmer>
        </ModalWrapper>
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
    const { onClick, onScroll } = this;
    return (
      <div {...{ onClick, onScroll }}>
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
