import React from 'react';
import { Popover } from '../../src';
import { partial } from 'lodash';

const content = (
  <div style={{backgroundColor: 'yellow', width: 200}}>
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

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      isOpen: false
    };
  },

  toggle(isOpen) {
    this.setState({ isOpen });
  },

  getAbsoluteProps() {
    return {
      content,
      position: 'bottom',
      anchor: 'center',
      attachToBody: true,
      dismissOnClickOutside: true,
      dismissOnScroll: false,
      event: 'click',
      offsetX: 0,
      distance: 15,
      offsetY: -15,
      onToggle: this.toggle,
      // onShow:partial(this.toggle,true),
      // onHide:partial(this.toggle, false)
    };
  },

  getRelativeProps() {
    return {
      content,
      position: 'right',
      anchor: 'center',
      distance: 15,
      offsetY: 0,
      offsetX: -15
    };
  },

  getTemplate() {
    return (
      <div>
        <div style={{marginTop: 200, marginLeft: 130}}>
          <Popover popover={this.getAbsoluteProps()}>
            <button ref='target' style={{backgroundColor: 'green', display: 'inline-block'}}>
              ABSOLUTE
            </button>
          </Popover>
        </div>
        <div style={{marginTop: 200, marginLeft: 130}}>
          <Popover popover={this.getRelativeProps()}>
            <button ref='target' style={{backgroundColor: 'green', display: 'inline-block'}}>
              RELATIVE
            </button>
          </Popover>
        </div>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
