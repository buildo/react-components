const FakeModal = React.createClass({
  render() {
    return (
      <ScrollView style={{ width: 300, height: 500, backgroundColor: 'yellow' }} scrollPropagation={false}>
        <div style={{ height: 1000 }}>
          <p>Hi, I'm modal number {this.props.id}</p>
          <button onClick={this.props.openOtherModal}>Open other modal</button>
        </div>
      </ScrollView>
    );
  }
});

const modals = [
  {
    id: '1',
    modal: FakeModal
  },
  {
    id: '2',
    modal: FakeModal
  }
];

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      activeModal: null
    };
  },

  openModal() {
    if (this.state.activeModal === '1') {
      this.setState({ activeModal: '2' });
    } else {
      this.setState({ activeModal: '1' });
    }
  },

  closeModal() {
    this.setState({ activeModal: null });
  },

  getTransitionStyles() {
    return {
      enter: {
        opacity: '0.01',
        transform: 'scale(0.01)',
        transition: 'opacity .8s ease-in-out, transform .5s ease-out',
      },
      enterActive: {
        opacity: '1',
        transform: 'scale(1)'
      },
      default: {},
      leave: {
        opacity: '1',
        transform: 'scale(1)',
        transition: 'opacity .8s ease-in-out, transform .5s ease-out',
      },
      leaveActive: {
        transform: 'scale(0.01)',
        opacity: '0.01'
      }
    }
  },

  getActiveModal() {
    const { activeModal } = this.state;
    const modal = find(modals, { id: activeModal });
    if (modal) {
      return (
        <BasicModal onDismiss={this.closeModal} key={modal.id}>
          <modal.modal id={modal.id} openOtherModal={this.openModal} />
        </BasicModal>
      );
    }
  },

  getTemplate() {
    return (
      <div>
        <button onClick={this.openModal}>Open modal</button>
        <ModalManager
          transitionStyles={this.getTransitionStyles()}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}>
            {this.getActiveModal()}
        </ModalManager>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});
