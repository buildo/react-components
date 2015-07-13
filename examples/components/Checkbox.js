import React from 'react';
import Checkbox from '../../src/checkbox'


const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      checked: false
    };
  },

  toggleCheck() {
    this.setState({checked: !this.state.checked});
  },

  getTemplate() {
    return (
      <div>
        <Checkbox checked={this.state.checked} onChange={this.toggleCheck} />
        <Checkbox label="hello I'm a label" checked={this.state.checked} onChange={this.toggleCheck} />
        <Checkbox
          className={'ui toggle checkbox' + (this.state.checked ? ' checked' : '')}
          checked={this.state.checked}
          onChange={this.toggleCheck}
        />
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
