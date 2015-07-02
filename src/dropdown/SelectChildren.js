import React from 'react';
import Select from 'react-select';
import omit from 'lodash/object/omit';

const themes = {
  semantic: 'semantic-theme'
};

const PropTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.element,
    React.PropTypes.array
  ]),
  theme: React.PropTypes.oneOf(['semantic']),
  valueLink: React.PropTypes.shape({
    value: React.PropTypes.string,
    requestChange: React.PropTypes.func
  })
};

const SelectChildren = React.createClass({

  propTypes: PropTypes,

  getChildren() {
    return [].concat(this.props.children || []);
  },

  renderOption(option) {
    return this.getChildren()[option.value];
  },

  renderValue(option) {
    return this.getChildren()[option.value];
  },

  getGeneralProps() {
    if (this.props.children && this.props.options) {
      console.warn('You\'re passing both children and options. Children will override options!');
    }
    return omit(this.props, Object.keys(PropTypes));
  },

  getChildrenProps() {
    if (this.props.children) {
      const options = this.getChildren().map((c, index) => {
        return {
          value: index,
          label: index
        };
      });

      return {
        options: options,
        valueRenderer: this.renderValue,
        optionRenderer: this.renderOption
      };
    }
  },

  getValueLinkProps() {
    if (this.props.valueLink) {
      return {
        value: this.props.valueLink.value,
        onChange: this.props.valueLink.requestChange
      };
    }
  },

  getClassName() {
    return {
      className: [this.props.className, themes[this.props.theme]].join(' ')
    };
  },

  render() {
    // The order is important: props may override previous ones
    return (
      <Select
        {...this.getGeneralProps()}
        {...this.getChildrenProps()}
        {...this.getValueLinkProps()}
        {...this.getClassName()}
      />
    );
  }

});

export default SelectChildren;
