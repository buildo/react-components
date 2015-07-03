import React from 'react';
import Modal from '../../src/modal'


const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      isOpen: true
    };
  },

  getTemplate() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} className='hello' style={{backgroundColor: 'blue'}} closable={false}>
          <i className='close icon' onClick={() => this.setState({isOpen: false})}/>
          <div className='header'>
            Modal Title
          </div>
          <div className='content'>
            <p>SONO</p>
            <p>UNA</p>
            <p>MODALE</p>
          </div>
        </Modal>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
