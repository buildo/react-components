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
    setTimeout(() => this.setState({ activeModal: '1' }), 500);
    setTimeout(() => this.setState({ activeModal: '2' }), 2000);
    setTimeout(() => this.setState({ activeModal: undefined }), 4000);
  },

  getTransitionStyles() {
    return {
      enter: {
        backgroundColor: 'rgba(0,0,0,0.01)',
        transition: 'background-color .8s ease-out, transform .8s ease-out'
      },
      enterActive: {
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      leave: {
        opacity: '1',
        transform: 'translateX(0)',
        WebkitTransition: 'opacity .8s ease-out, -webkit-transform .8s ease-out',
        transition: 'opacity .8s ease-out, transform .8s ease-out'
      },
      leaveActive: {
        opacity: '0.01',
        transform: 'translateX(100%)'
      },
      default: {
        WebkitTransition: '-webkit-transform 0.3s ease-in-out',
        transition: 'transform 0.3s ease-in-out'
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
