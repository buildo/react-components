import React from 'react';
import cx from 'classnames';
import pick from 'lodash/object/pick';
import omit from 'lodash/object/omit';

const propTypes = {
  children: React.PropTypes.node,
  row: React.PropTypes.bool,
  column: React.PropTypes.bool,
  auto: React.PropTypes.bool,
  vAlignContent: React.PropTypes.oneOf(['top', 'center', 'bottom']),
  hAlignContent: React.PropTypes.oneOf(['left', 'center', 'right']),
  marginLeft: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  marginTop: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  marginRight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  marginBottom: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  grow: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  shrink: React.PropTypes.oneOfType([
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
};

export default React.createClass({

  propTypes: propTypes,

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
    if (typeof this.props.shrink === 'number') {
      return this.props.shrink;
    } else if (this.props.shrink) {
      return 1;
    }

    if (this.props.flexBasis || this.props.auto) {
      return 0;
    } else {
      return 1; // grow === true or default
    }
  },

  getBasis() {
    const { flexBasis, grow, shrink, auto } = this.props;

    if (flexBasis) {
      const suffix = typeof flexBasis === 'number' ? 'px' : '';
      return flexBasis + suffix;
    } else if (grow && !shrink && !auto) {
      return '100%';
    } else {
      return 'auto'; // safe default
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
    const style = pick(this.props, [
      'width',
      'height',
      'marginLeft',
      'marginTop',
      'marginRight',
      'marginBottom'
    ]);
    return {...this.getFlexStyle(), ...style, ...this.props.style};
  },

  getContentAlignmentClasses() {
    const vPrefix = this.props.column ? 'justify-content-' : 'align-content-';
    const hPrefix = this.props.column ? 'align-content-' : 'justify-content-';

    const vAlignContentClasses = {
      top: `${vPrefix}start`,
      center: `${vPrefix}center`,
      bottom: `${vPrefix}end`
    };

    const hAlignContentClasses = {
      left: `${hPrefix}start`,
      center: `${hPrefix}center`,
      right: `${hPrefix}end`
    };

    const vAlignContent = vAlignContentClasses[this.props.vAlignContent];
    const hAlignContent = hAlignContentClasses[this.props.hAlignContent];

    return cx(vAlignContent, hAlignContent);
  },

  getClasses() {
    const direction = this.props.column ? 'flex-column' : 'flex-row';
    const contentAlignment = this.getContentAlignmentClasses();
    return cx('react-flex-view', direction, contentAlignment, this.props.className);
  },

  render() {
    const className = this.getClasses();
    const style = this.getStyle();
    const props = omit(this.props, Object.keys(propTypes));
    return (
      <div className={className} style={style} { ...props }>
        {this.props.children}
      </div>
    );
  }

});
