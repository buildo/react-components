import React from 'react';
import { TextOverflow, Popover, FlexView } from '../../src';

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
      <FlexView style={{marginTop: 100}}>
        <button style={{maxWidth: 100, marginRight: 100}} onClick={this.toggleTextVersion}>
          <TextOverflow style={{color: 'blue'}} label={this.state.text} popover={{position: 'bottom', anchor: 'left'}} />
        </button>
        <div style={{maxWidth: 150}}>
          <TextOverflow style={{color: 'blue'}} label='sono un testo lungo lungo lungo'>
            {(self) => <Popover popover={{content: 'sono un testo lungo lungo lungo'}} style={{color: 'red', flex: '0 0 100%'}}>{self}</Popover>}
          </TextOverflow>
        </div>
      </FlexView>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
