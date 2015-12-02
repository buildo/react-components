import React from 'react';
import omit from 'lodash/object/omit';

const propTypes = {
  children: React.PropTypes.node.isRequired,
  color: React.PropTypes.string,
  alpha: React.PropTypes.number,
  stopScrollPropagation: React.PropTypes.bool,
  onScrollOutside: React.PropTypes.func,
  onClickOutside: React.PropTypes.func,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  style: React.PropTypes.object
};

const BackgroundDimmer = React.createClass({

  propTypes: propTypes,

  getDefaultProps() {
    return {
      color: 'black',
      alpha: 0.5
    };
  },

  componentDidMount() {
    this.addScrollListener();
  },

  addScrollListener() {
    const dimmedBackground = this.refs.dimmedBackground.getDOMNode();
    dimmedBackground.addEventListener('wheel', this.onScroll);
    dimmedBackground.addEventListener('touchmove', this.onScroll);
  },

  removeScrollListener() {
    const dimmedBackground = this.refs.dimmedBackground.getDOMNode();
    dimmedBackground.removeEventListener('wheel', this.onScroll);
    dimmedBackground.removeEventListener('touchmove', this.onScroll);
  },

  isEventOutsideChildren(e) {
    const el = e.target || e.srcElement;
    return el === this.refs.dimmedBackground.getDOMNode();
  },

  onClick(e) {
    const { onClickOutside } = this.props;
    if (onClickOutside && this.isEventOutsideChildren(e)) {
      onClickOutside(e);
    }
  },

  onScroll(e) {
    const { stopScrollPropagation, onScrollOutside } = this.props;
    if (this.isEventOutsideChildren(e)) {
      if (stopScrollPropagation) {
        e.preventDefault();
      }
      if (onScrollOutside) {
        onScrollOutside(e);
      }
    }
  },

  getDimmedBackground() {
    const { color, alpha } = this.props;
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: color,
      opacity: alpha + ''
    };
    return <div style={style} onClick={this.onClick} ref='dimmedBackground' />;
  },

  render() {
    const { style, className, id, children } = this.props;
    const other = omit(this.props, Object.keys(propTypes));
    const mergedStyle = {
      position: 'relative',
      ...style
    };
    return (
      <div {...{ style: mergedStyle, className, id, ...other }}>
        {this.getDimmedBackground()}
        <div style={{ visibility: 'hidden' }}>{children}</div>
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
          {children}
        </div>
      </div>
    );
  },

  componentWillUnmount() {
    this.removeScrollListener();
  }

});

export default BackgroundDimmer;
