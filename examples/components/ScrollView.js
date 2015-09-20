import React from 'react';
import { ScrollView } from '../../src';
import partial from 'lodash/function/partial';

const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <ScrollView
          className='hello'
          easing='easeOutQuad'
          scrollPropagation={false}
          style={{backgroundColor: 'blue', maxHeight: 500, marginTop: 100}}>
            {(scrollTo) => [
              <div style={{backgroundColor: 'red', height: 200, width: '100%'}}/>,
              <div style={{backgroundColor: 'green', height: 200, width: '100%'}}/>,
              <div style={{backgroundColor: 'yellow', height: 200, width: '100%'}}/>,
              <div style={{backgroundColor: 'black', height: 200, width: '100%'}}/>,
              <button onClick={partial(scrollTo, 0, 0, 1500)} />
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
