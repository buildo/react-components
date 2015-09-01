import React from 'react';
import { Popover } from '../../src';


const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      isOpen: false
    };
  },

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  },

  getTemplate() {
    const content = (
      <div>
        <div>
          Popover Title
        </div>
        <div>
          <p>SONO</p>
          <p>UN</p>
          <p>POPOVER</p>
        </div>
      </div>
    );
    return (
      <div>
        <Popover popover={{content, position: 'bottom', anchor: 'center'}}>
          <button ref='target' onClick={this.toggle} style={{backgroundColor: 'blue', display: 'inline-block'}}>
            CLICK ME
          </button>
        </Popover>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
