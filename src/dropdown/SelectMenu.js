import React from 'react';
import Select from 'react-select';
import omit from 'lodash/object/omit';

const SelectMenu = React.createClass({

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element
    ]).isRequired
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  componentDidMount() {
    const control = this.refs.select.getDOMNode().getElementsByClassName('Select-control')[0];
    const arrowZone = control.getElementsByClassName('Select-arrow-zone')[0];
    const arrow = control.getElementsByClassName('Select-arrow')[0];

    // Override mouse events
    control.onmousedown = this.openMenu;
    control.ontouchend = this.openMenu;
    arrowZone.onmousedown = this.toggleMenu;
    arrow.onmousedown = this.toggleMenu;
  },

  openMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({isOpen: true});
  },

  toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({isOpen: !this.state.isOpen});
  },

  render() {
    const isOpenClass = this.state.isOpen ? 'is-open' : '';
    return (
      <div>
        <Select {...omit(this.props, 'children')} className={isOpenClass} ref='select'/>
        {this.state.isOpen ? this.props.children : null}
      </div>
    );
  }

});

export default SelectMenu;
