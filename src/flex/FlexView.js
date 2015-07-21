import React from 'react';

export default React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    row: React.PropTypes.bool,
    column: React.PropTypes.bool,
    auto: React.PropTypes.bool,
    centerVertically: React.PropTypes.bool,
    grow: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.bool
    ]),
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    flexBasis: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      className: '',
      style: {}
    };
  },

  getGrow() {
    if (typeof this.props.grow === 'number') {
      return this.props.grow;
    } else if (this.props.grow) {
      return 1;
    } else {
      return 0; // auto === true or default
    }
  },

  getShrink() {
    if (this.props.flexBasis || this.props.auto) {
      return 0;
    } else {
      return 1; // grow === true or default
    }
  },

  getBasis() {
    if (this.props.flexBasis) {
      const suffix = typeof this.props.flexBasis === 'number' ? 'px' : '';
      return this.props.flexBasis + suffix;
    } else if (this.props.grow) {
      return '100%';
    } else {
      return 'auto'; // auto === true or default
    }
  },

  getFlexStyle() {
    const grow = this.getGrow();
    const shrink = this.getShrink();
    const basis = this.getBasis();
    const values = `${grow} ${shrink} ${basis}`;
    return {
      WebkitBoxFlex: values,
      MozBoxFlex: values,
      msFlex: values,
      WebkitFlex: values,
      flex: values
    };
  },

  getStyle() {
    const sizeStyle = {
      width: this.props.width,
      height: this.props.height
    };
    return {...this.getFlexStyle(), ...sizeStyle, ...this.props.style};
  },

  getClasses() {
    const direction = this.props.column ? 'flex-column' : 'flex-row';
    const centerVertically = this.props.centerVertically === true ? 'flex-vertically-centered' : '';
    return `react-flex-view ${direction} ${centerVertically} ${this.props.className}`;
  },

  render() {
    const className = this.getClasses();
    const style = this.getStyle();
    return <div className={className} style={style}>{this.props.children}</div>;
  }

});
