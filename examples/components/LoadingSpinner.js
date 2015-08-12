import React from 'react';
import LoadingSpinner from '../../src/loading-spinner'


const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
    };
  },

  getTemplate() {
    return (
      <div style={{position: 'relative', height: 200}}>
        <LoadingSpinner />
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
