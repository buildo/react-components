import React from 'react/addons';
import { range, reject, find } from 'lodash';
import ModalManager from '../../src/modal-manager';
import BasicModal from '../../src/modal-manager/BasicModal';
import { ScrollView } from '../../src';

const FakeModal = React.createClass({
  render() {
    return (
      <ScrollView style={{ width: 300, height: 500, backgroundColor: 'yellow', overflow: 'scroll' }} scrollPropagation={false}>
        <div style={{ height: 1000 }}>
          CIAO, sono una modale...che scrolla!
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
      activeModal: undefined
    };
  },

  componentDidMount() {
    setTimeout(() => this.setState({ activeModal: '1' }), 1000);
    setTimeout(() => this.setState({ activeModal: '2' }), 2500);
    // setTimeout(() => this.setState({ activeModal: undefined }), 4500);
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

  onClickOutside() {
    console.log('ON_CLICK_OUTSIDE');
  },

  getActiveModal() {
    const { activeModal } = this.state;
    const modal = find(modals, { id: activeModal });
    if (modal) {
      return (
        <BasicModal onDismiss={this.onClickOutside} key={modal.id}>
          <modal.modal />
        </BasicModal>
      );
    }
  },

  getTemplate() {
    return (
      <div style={{ height: 2000 }}>
        <button>You shouldn't be able to click me</button>
        <p>Also, you shouldn't be able to scroll!</p>
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

export default Example;
