import React from 'react';
import Toaster from '../../src/toaster/Toaster';

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      initialized: false
    };
  },

  componentDidMount() {
    this.setState({ initialized: true });
  },

  getTemplate() {

    const toaster = (
      <Toaster attachTo='toaster' className='hello' style={{backgroundColor: 'blue'}}>
        <div style={{backgroundColor: 'yellow', height: 50, width: 200, marginTop: 10, marginRight: 20}} />
        <div style={{backgroundColor: 'yellow', height: 50, width: 200, marginTop: 10, marginRight: 20}} />
        <div style={{backgroundColor: 'yellow', height: 50, width: 200, marginTop: 10, marginRight: 20}} />
        <div style={{backgroundColor: 'yellow', height: 50, width: 200, marginTop: 10, marginRight: 20}} />
      </Toaster>
    );

    return (
      <div style={{ width: '100%', height: 500, position: 'relative' }} id='toaster'>
        {this.state.initialized && toaster}
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
