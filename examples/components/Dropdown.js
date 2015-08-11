import React from 'react';
import SelectChildren from '../../src/dropdown'


const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <SelectChildren>
          <p>one</p>
          <p>deux</p>
          <p>tres</p>
          <p>quattro</p>
        </SelectChildren>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
