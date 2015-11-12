import React from 'react';

const BackgroundDimmer = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    color: React.PropTypes.string,
    alpha: React.PropTypes.number,
    stopScrollPropagation: React.PropTypes.bool,
    onClickOutside: React.PropTypes.func,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      color: 'black',
      alpha: 0.5
    };
  },

  componentDidMount() {
    if (this.props.stopScrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  enableScrollPropagation() {
    const dimmedBackground = this.refs.dimmedBackground.getDOMNode();
    dimmedBackground.removeEventListener('wheel', this.stopScrollPropagation);
    dimmedBackground.removeEventListener('touchmove', this.stopScrollPropagation);
  },

  disableScrollPropagation() {
    const dimmedBackground = this.refs.dimmedBackground.getDOMNode();
    dimmedBackground.addEventListener('wheel', this.stopScrollPropagation);
    dimmedBackground.addEventListener('touchmove', this.stopScrollPropagation);
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

  stopScrollPropagation(e) {
    const { stopScrollPropagation } = this.props;
    if (stopScrollPropagation && this.isEventOutsideChildren(e)) {
      e.preventDefault();
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
    const mergedStyle = {
      position: 'relative',
      ...style
    };
    return (
      <div {...{ style: mergedStyle, className, id }}>
        {this.getDimmedBackground()}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {children}
        </div>
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.stopScrollPropagation && this.props.stopScrollPropagation) {
      this.enableScrollPropagation();
    } else if (nextProps.stopScrollPropagation && !this.props.stopScrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  componentWillUnmount() {
    if (this.props.stopScrollPropagation) {
      this.enableScrollPropagation();
    }
  }

});

export default BackgroundDimmer;
