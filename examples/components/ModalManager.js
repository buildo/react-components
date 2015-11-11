import React from 'react/addons';
import { range, reject } from 'lodash';
import ModalManager from '../../src/modal-manager';
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
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      enterActive: {
        opacity: '1',
        transform: 'scale(1)'
      },
      default: {
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      leave: {
        opacity: '1',
        transform: 'scale(1)',
        transition: 'opacity .8s ease-in-out, transform .5s ease-out',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      leaveActive: {
        transform: 'scale(0.01)',
        opacity: '0.01'
      }
    }
  },

  getTemplate() {
    return (
      <div style={{ height: 2000 }}>
        <button>You shouldn't be able to click me</button>
        <p>Also, you shouldn't be able to scroll!</p>
        <ModalManager
          activeModal={this.state.activeModal}
          modals={modals}
          transitionStyles={this.getTransitionStyles()}
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
          onClickOutside={() => this.setState({ activeModal: undefined })}
          />
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
