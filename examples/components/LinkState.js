import React from 'react';
import get from 'lodash/object/get';
import { LinkedStateMixin, ValueLinkMixin, getValueLink, linkState } from '../../src';


const Example = React.createClass({

  propTypes: {},

  mixins: [LinkedStateMixin, ValueLinkMixin],

  getInitialState() {
    return {
    };
  },

  getTemplate() {
    const value = get(this.state, 'form.input');
    console.log(this.getValueLink({ value: 5, onChange: () => {} }));
    return (
      <div style={{position: 'relative', height: 200}}>
        <input valueLink={this.linkState(['form', 'input'])} />
        <p>{`value: ${value}`}</p>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
