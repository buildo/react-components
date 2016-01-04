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

  componentDidUpdate() {
    this.verifyOverflow();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.label !== this.props.label) {
      this.reset();
    }
  },

  reset() {
    this.setState({ isOverflowing: false });
  },

  logWarnings() {
    const { width, flex } = this.refs.text.getDOMNode().parentNode.style;
    const flexBasis = flex ? flex.split(' ')[2] : null;
    if (process.env.NODE_ENV !== 'production' && width !== '100%' && flexBasis !== '100%') {
      console.warn(`WARNING: TextOverflow's parent doesn't have "width: 100%" nor "flex-basis: 100%"`);
    }
  },

  verifyOverflow(state) {
    state = state || this.state;
    if (state.isOverflowing === false) {
      const text = this.refs.text.getDOMNode();
      if(text.offsetWidth < text.scrollWidth){
        this.setState({ isOverflowing: true }, this.logWarnings);
      } else {
        this.logWarnings();
      }
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
  }

});

export default TextOverflow;
