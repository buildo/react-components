import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown';
import omit from 'lodash/omit';

export default class DropdownMenu extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element
    ]).isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    const control = ReactDOM.findDOMNode(this.refs.select).getElementsByClassName('Select-control')[0];
    const arrowZone = control.getElementsByClassName('Select-arrow-zone')[0];
    const arrow = control.getElementsByClassName('Select-arrow')[0];

    // Override mouse events
    control.onmousedown = this.openMenu;
    control.ontouchend = this.openMenu;
    arrowZone.onmousedown = this.toggleMenu;
    arrow.onmousedown = this.toggleMenu;
  }

  openMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isOpen: true });
  };

  toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const isOpenClass = this.state.isOpen ? 'is-open' : '';
    return (
      <div>
        <Dropdown {...omit(this.props, 'children')} className={isOpenClass} ref='select'/>
        {this.state.isOpen ? this.props.children : null}
      </div>
    );
  }

}
