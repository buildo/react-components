import React from 'react';
import { ScrollView } from '../../src';

const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <ScrollView
          className='hello'
          scrollPropagation={false}
          style={{backgroundColor: 'blue', maxHeight: 120}}>
            {() => [
              <div style={{backgroundColor: 'red', height: 300, width: 30}}/>,
              <div style={{backgroundColor: 'green', height: 300, width: 30}}/>
            ]}
        </ScrollView>
        <div style={{height: 3000}} />
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
