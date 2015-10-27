import React from 'react';
import Popover from '../popover/Popover';

const TextOverflow = React.createClass({

  propTypes: {
    children: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
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

  logWarnings() {
    const { width } = this.refs.text.getDOMNode().parentNode.style;
    if (process.env.NODE_ENV !== 'production' && width !== '100%') {
      console.warn(`TextOverflow's parent doesn't have "width: 100%". This might cause a stack overflow.`);
    }
  },

  verifyOverflow(state) {
    state = state || this.state;
    const text = this.refs.text.getDOMNode();
    this.logWarnings();
    if(text.offsetWidth < text.scrollWidth && !state.isOverflowing){
      this.setState({ isOverflowing: true });
    } else if (text.offsetWidth >= text.scrollWidth && state.isOverflowing){
      this.setState({ isOverflowing: false });
    }
  },

  getTextSpan() {
    const { label } = this.props;
    const style = {
      display: 'block',
      whiteSpace: 'nowrap',
      width: '100%',
      overflow: 'hidden',
      OTextOverflow: 'ellipsis', // Opera
      textOverflow: 'ellipsis'
    };
    return <span ref='text' style={style}>{label}</span>;
  },

  templateOverflow() {
    const { children, label, style, ...other } = this.props;

    if (children) {
      return children(this.getTextSpan());
    } else {
      const props = {
        ...other,
        popover: {
          content: label,
          event: 'hover'
        },
        style: {
          width: '100%',
          ...style
        }
      };

      return <Popover { ...props }>{this.getTextSpan()}</Popover>;
    }
  },

  templeteStandard() {
    const { children, label, style, ...other } = this.props;
    const props = {
      ...other,
      style: {
        width: '100%',
        ...style
      }
    };

    return <div { ...props }>{this.getTextSpan()}</div>;
  },

  render() {
    return this.state.isOverflowing ? this.templateOverflow() : this.templeteStandard();
  },

  componentDidUpdate() {
    this.verifyOverflow();
  }

});

export default TextOverflow;
