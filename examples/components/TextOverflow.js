import React from 'react';
import { TextOverflow } from '../../src';

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      text: 'short text'
    };
  },

  toggleTextVersion() {
    this.setState({text: this.state.text === 'short text' ? 'very long text translation' : 'short text'});
  },

  getTemplate() {
    return (
      <div>
        <button style={{maxWidth: 100}} onClick={this.toggleTextVersion}>
          <TextOverflow style={{color: 'blue'}} popover={{position: 'bottom', anchor: 'left'}}>
            {this.state.text}
          </TextOverflow>
        </button>
        <TextOverflow style={{color: 'blue', width: 150}}>
          sono un testo lungo lungo lungo
        </TextOverflow>
        <TextOverflow style={{color: 'blue', width: 150}}>
          <span>sono un testo lungo lungo lungo</span>
        </TextOverflow>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
