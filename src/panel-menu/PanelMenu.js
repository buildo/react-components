import React from 'react';
import Menu from './components/Menu';

const PanelMenu = React.createClass({ //eslint-disable-line

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array
    ]),
    options: React.PropTypes.array,
    iconClassName: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  },

  getIconButton() {
    return <i className={`dropdown-menu-icon ${this.props.iconClassName}`} onClick={this.toggleMenu}/>;
  },

  getMenu() {
    if (this.state.isOpen) {
      return <Menu {...this.props}/>;
    }
  },

  render() {
    const style = {
      position: 'relative',
      display: 'inline-block'
    };
    return (
      <div className='dropdown-menu-component' style={style}>
        {this.getIconButton()}
        {this.getMenu()}
      </div>
    );
  }

});

export default PanelMenu;
