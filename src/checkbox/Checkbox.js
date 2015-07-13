import React from 'react';
import omit from 'lodash/object/omit';

const omitted = ['label', 'iconChecked', 'iconUnchecked', 'className', 'style'];

const Checkbox = React.createClass({

  propTypes: {
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    iconChecked: React.PropTypes.string,
    iconUnchecked: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      className: '',
      style: {}
    };
  },

  usePseudoCheckbox() {
    return this.props.iconChecked && this.props.iconUnchecked;
  },

  getType() {
    if (this.usePseudoCheckbox()) {
      return 'hidden';
    }
    return 'checkbox';
  },

  getPseudoCheckbox() {
    if (this.usePseudoCheckbox()) {
      const icon = this.props.checked ? this.props.iconChecked : this.props.iconUnchecked;
      return (
        <div>
          <i className={icon} />
        </div>
      );
    }
  },

  render() {
    return (
      <div className={this.props.className} style={this.props.style} onClick={this.props.onChange}>
        <input
          {...omit(this.props, omitted)}
          type={this.getType()}
        />
        {this.getPseudoCheckbox()}
        <label>{this.props.label}</label>
      </div>
    );
  }

});

export default Checkbox;
