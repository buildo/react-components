import React from 'react';
import {FlexView, FlexCell} from '../../src/flex';

const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <FlexView className='hello' style={{backgroundColor: 'blue'}}>
          <div className='ui segment' style={{backgroundColor: 'red'}}/>
          <div className='ui segment' style={{backgroundColor: 'green'}}/>
        </FlexView>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
