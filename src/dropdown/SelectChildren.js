import React from 'react';
import Select from 'react-select';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';

const SelectChildren = React.createClass({

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array
    ]).isRequired
  },

  getChildren() {
    return [].concat(this.props.children);
  },

  renderOption(option) {
    return this.getChildren()[option.value];
  },

  renderValue(option) {
    return this.getChildren()[option.value];
  },

  getProps() {
    const options = this.getChildren().map((c, index) => {
      return {
        value: index,
        label: index
      };
    });

    const props = omit(this.props, 'children');
    return assign(props, {
      options: options,
      valueRenderer: this.renderValue,
      optionRenderer: this.renderOption
    });
  },

  render() {
    return <Select {...this.getProps()} />;
  }

});

export default SelectChildren;
