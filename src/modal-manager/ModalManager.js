import React from 'react/addons';
import ModalWrapper from './ModalWrapper';
const { TransitionGroup: ReactTransitionGroup, cloneWithProps } = React.addons;

const ModalManager = React.createClass({

  propTypes: {
    activeModal: React.PropTypes.string,
    data: React.PropTypes.object,
    modals: React.PropTypes.array.isRequired,
    onClickOutside: React.PropTypes.func
  },



  componentDidMount() {
    this.appendModalContainer();
    this.renderModals();
    this.disableScrollPropagation();
  },

  componentWillUnmount() {
    this.removeModalContainer();
  },

  getModalManagerNode() {
    if (this.containerNode) {
      return this.containerNode.children[0];
    }
  },

  isEventOutsideModal(e) {
    const target = e.target.parentNode ? e.target.parentNode.parentNode : null;
    const modalManager = this.containerNode.children[0];
    return target === modalManager;
  },

  onClick(e) {
    const { onClickOutside, activeModal } = this.props;
    if (onClickOutside && activeModal && this.isEventOutsideModal(e)) {
      onClickOutside(e);
    }
  },

  disableScrollPropagation() {
    this.getModalManagerNode().addEventListener('wheel', this.stopScrollPropagation);
    this.getModalManagerNode().addEventListener('touchmove', this.stopScrollPropagation);
  },

  stopScrollPropagation(e) {
    if (this.isEventOutsideModal(e)) {
      e.preventDefault();
    }
  },

  getModals() {
    const { transitionStyles, transitionEnterTimeout, transitionLeaveTimeout } = this.props;
    const { activeModal, data, modals } = this.props;
    const transitionProps = {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout
    };
    const style = {
      height: '100%',
      width: '100%'
    };
    return modals.filter(m => m.id === activeModal).map(m => {
      return (
        <ModalWrapper {...transitionProps} style={style} className='modal-wrapper' key={m.id}>
          <m.modal {...data} />
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
    const style = {
      position: 'fixed',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0
    };
    return (
      <div {...{ style, onClick, onScroll }}>
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
