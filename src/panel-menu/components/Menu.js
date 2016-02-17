import React from 'react';
import partial from 'lodash/function/partial';
import { warn } from '../utils/log';

const Menu = React.createClass({ //eslint-disable-line react/prefer-es6-class

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array
    ]),
    options: React.PropTypes.array
  },

  getMenuTitle(option, i) {
    return <div className='menu-title' key={i}>{option.title}</div>;
  },

  getDivider(i) {
    const style = {
      width: '100%',
      height: 1,
      backgroundColor: '#EAEAEA'
    };
    return <div className='menu-divider' key={i} style={style}/>;
  },

  getMenuItem(option, i) {
    return (
      <div className='menu-item' key={i} style={{ position: 'relative' }} onClick={partial(option.onClick, option)}>
        <span className='menu-item-title'>
          {option.title}
        </span>
        <span className='menu-item-metadata' style={{ right: 0, position: 'absolute' }}>
          {option.metadata}
        </span>
      </div>
    );
  },

  getType(option, i) {
    switch (option.type) {
      case 'title':
        return this.getMenuTitle(option, i);

      case 'item':
        return this.getMenuItem(option, i);

      case 'divider':
        return this.getDivider(i);

      default:
        warn(`Option with invalid type at index ${i}`);
        return 'INVALID TYPE';
    }
  },

  getRenderedOptions() {
    const style = {
      width: '100%',
      position: 'relative'
    };
    return this.props.options.map((option, i) =>
      <div className='menu-row' style={style}>{this.getType(option, i)}</div>);
  },

  getContent() {
    if (this.props.children && this.props.options) {
      warn('You\'re passing both Children and options: Children will override options!');
    }
    return this.props.children || this.getRenderedOptions();
  },

  render() {
    return (
      <div className='dropdown-menu' style={{ position: 'absolute', right: 0 }}>
        {this.getContent()}
      </div>
    );
  }

});

export default Menu;
