import React from 'react';
import omit from 'lodash/object/omit';

const omittedProps = ['children', 'isOpen', 'className', 'style'];

const Modal = React.createClass({

  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.element,
      React.PropTypes.array
    ]),
    isOpen: React.PropTypes.bool.isRequired
  },

  getDefaultProps() {
    return {
      className: '',
      style: {}
    };
  },

  componentDidMount() {
    const modal = $(this.refs.modal.getDOMNode());
    const settings = omit(this.props, omittedProps);
    settings.detachable = false;
    modal.modal(settings);
    if (this.props.isOpen) {
      modal.modal('show');
    }
  },

  render() {
    return (
      <div ref='modal' className={`ui modal ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      $(this.refs.modal.getDOMNode()).modal('show');
    } else if (!nextProps.isOpen && this.props.isOpen) {
      $(this.refs.modal.getDOMNode()).modal('hide');
    }
  }

});

export default Modal;
