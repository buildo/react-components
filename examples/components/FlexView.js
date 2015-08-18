import React from 'react';
import { FlexView, FlexCell } from '../../src';

const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <FlexView
          className='hello'
          style={{backgroundColor: 'blue', height: 120}}
          column
          hAlignContent='center'
          vAlignContent='center'>
            <div style={{backgroundColor: 'red', height: 30, width: 30}}/>
            <div style={{backgroundColor: 'green', height: 30, width: 30}}/>
        </FlexView>
        <br/>
        <FlexView
          className='hello'
          style={{backgroundColor: 'blue', height: 120}}>
            <FlexView
              style={{backgroundColor: 'red', height: 30, width: 30}}
              marginTop='auto'
              marginBottom='auto'
              />
            <FlexView
              style={{backgroundColor: 'green', height: 30, width: 30}}
              marginLeft='auto'
              />
        </FlexView>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
