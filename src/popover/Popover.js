import React from 'react';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';

const omittedProps = ['children', 'isOpen', 'content', 'className', 'style', 'popoverClassName'];

const Popover = React.createClass({

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array
    ]).isRequired,
    content: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array
    ]).isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    popoverClassName: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      className: '',
      popoverClassName: '',
      style: {},
      onVisible: () => {},
      onHidden: () => {}
    };
  },

  getInitialState() {
    return {
      visible: false
    };
  },

  componentDidMount() {
    const userSettings = omit(this.props, omittedProps);
    const settings = {
      on: 'manual',
      popup: $(this.refs.popover.getDOMNode()),
      onVisible: this.onVisible,
      onHidden: this.onHidden,
      hideOnScroll: false // TODO
    };
    $(this.refs.children.getDOMNode()).popup(assign(userSettings, settings));
    if (this.props.isOpen) {
      this.show();
    }
  },

  onVisible(node) {
    this.setState({visible: true});
    this.props.onVisible(node);
  },

  onHidden(node) {
    this.setState({visible: false});
    this.props.onHidden(node);
  },

  show() {
    $(this.refs.children.getDOMNode()).popup('show');
  },

  hide() {
    $(this.refs.children.getDOMNode()).popup('hide');
  },

  componentWillUnmount() {
    $(this.refs.children.getDOMNode()).popup('destroy');
  },

  render() {
    return (
      <div className={`react-popover-component ${this.props.className}`} style={this.props.style}>
        <div className='react-popover-children' ref='children' style={{display: 'inline-block'}}>
          {this.props.children}
        </div>
        <div className={`react-popover ${this.props.popoverClassName}`} ref='popover'>
          {this.props.content}
        </div>
      </div>
    );
  },

  componentWillUpdate(nextProps, nextState) {
    // nextState.visible is used to avoid conflicts during transitions
    if (!nextState.visible && (nextProps.isOpen || this.props.isOpen)) {
      this.show();
    } else if (nextState.visible && (!nextProps.isOpen || !this.props.isOpen)) {
      this.hide();
    }
  }

});

export default Popover;
