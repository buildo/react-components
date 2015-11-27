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
  basis: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  height: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  width: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  flexBasis: React.PropTypes.oneOfType([ // deprecated
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  wrap: React.PropTypes.bool,
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
    const { grow } = this.props;
    if (typeof grow === 'number') {
      return grow;
    } else if (grow) {
      return 1;
    } else {
      return 0; // auto === true or default
    }
  },

  getShrink() {
    const { shrink, basis, flexBasis, auto } = this.props;
    if (typeof shrink === 'number') {
      return shrink;
    } else if (shrink) {
      return 1;
    }

    if (basis || flexBasis || auto) {
      return 0;
    } else {
      return 1; // grow === true or default
    }
  },

  getBasis() {
    const { grow, shrink, basis, flexBasis, auto } = this.props;
    const _basis = basis || flexBasis;
    if (_basis) {
      const suffix = typeof _basis === 'number' ? 'px' : '';
      return _basis + suffix;
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
    const wrap = this.props.wrap && 'flex-wrap';
    return cx('react-flex-view', direction, contentAlignment, wrap, this.props.className);
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
