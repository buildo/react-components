import React from 'react/addons';
import { range, reject } from 'lodash';
import ModalManager from '../../src/modal-manager';

const FakeModal = React.createClass({
  render() {
    return (
      <div style={{ width: 300, height: 500, backgroundColor: 'yellow' }}>
        CIAO, sono una modale!
      </div>
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
        transition: 'opacity .8s ease-in-out, transform .5s ease-out'
      },
      enterActive: {
        opacity: '1',
        transform: 'scale(1)',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      leave: {
        opacity: '1',
        transform: 'scale(1)',
        transition: 'opacity .8s ease-in-out, transform .5s ease-out'
      },
      leaveActive: {
        transform: 'scale(0.01)',
        opacity: '0.01'
      }
    }
  },

  getTemplate() {
    return (
      <ModalManager
        activeModal={this.state.activeModal}
        modals={modals}
        transitionStyles={this.getTransitionStyles()}
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}
        />
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
