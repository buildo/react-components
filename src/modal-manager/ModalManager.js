import React from 'react/addons';
import cx from 'classnames';
import ModalWrapper from './ModalWrapper';
const { TransitionGroup: ReactTransitionGroup, cloneWithProps } = React.addons;

const ModalManager = React.createClass({

  propTypes: {
    activeModal: React.PropTypes.string,
    data: React.PropTypes.object,
    modals: React.PropTypes.array.isRequired
  },

  componentDidMount() {
    this.appendModalContainer();
    this.renderModals();
  },

  componentWillUnmount() {
    this.removeModalContainer();
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
      position: 'fixed',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)'
    };
    return modals.filter(m => m.id === activeModal).map(m => {
      return (
        <ModalWrapper {...transitionProps} style={style} key={m.id}>
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
    const { style, id, className } = this.props;
    return (
      <div className={cx('modal-manager', className)} {...{ style, id }}>
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
