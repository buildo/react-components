import React from 'react';
import Popover from '../popover/Popover';

const TextOverflow = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getInitialState() {
    return {
      isOverflowing: false
    };
  },

  componentDidMount() {
    this.verifyOverflow();
  },

  verifyOverflow(state) {
    state = state || this.state;
    const text = this.refs.text.getDOMNode();
    if(text.offsetWidth < text.scrollWidth && !state.isOverflowing){
      this.setState({ isOverflowing: true });
    } else if (text.offsetWidth >= text.scrollWidth && state.isOverflowing){
      this.setState({ isOverflowing: false });
    }
  },

  getTextSpan() {
    const { children } = this.props;
    const style = {
      display: 'block',
      whiteSpace: 'nowrap',
      width: '100%',
      overflow: 'hidden',
      OTextOverflow: 'ellipsis', // Opera
      textOverflow: 'ellipsis'
    };
    return <span ref='text' style={style}>{children}</span>;
  },

  render() {
    const { children, ...props } = this.props;
    const { isOverflowing } = this.state;
    props.popover = {
      ...props.popover,
      content: children,
      event: 'hover'
    };
    props.style = {
      width: '100%',
      ...props.style
    };

    const text = this.getTextSpan();
    if (isOverflowing) {
      return <Popover { ...props }>{text}</Popover>;
    } else {
      return <div { ...props }>{text}</div>;
    }
  },

  componentDidUpdate() {
    this.verifyOverflow();
  }

});

export default TextOverflow;
