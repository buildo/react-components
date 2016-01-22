import React, { PropTypes } from 'react';
import cx from 'classnames';
import pick from 'lodash/object/pick';
import omit from 'lodash/object/omit';

const propTypes = {
  /**
   * FlexView content
   */
  children: PropTypes.node,
  /**
   * flex-direction: column
   */
  column: PropTypes.bool,
  /**
   * set flex: 0 0 100% NOTE: each property may be overwritten by their own props (grow, shrink, basis)
   */
  auto: PropTypes.bool,
  /**
   * align content vertically
   */
  vAlignContent: PropTypes.oneOf(['top', 'center', 'bottom']),
  /**
   * align content horizontally
   */
  hAlignContent: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * margin-left property ("auto" to align self right)
   */
  marginLeft: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * margin-top property ("auto" to align self bottom)
   */
  marginTop: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * margin-right property ("auto" to align self left)
   */
  marginRight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * margin-bottom property ("auto" to align self top)
   */
  marginBottom: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * flex-grow property (for parent primary axis)
   */
  grow: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ]),
  /**
   * flex-shrink property
   */
  shrink: PropTypes.oneOfType([ PropTypes.bool, PropTypes.number ]),
  /**
   * flex-basis property
   */
  basis: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * wrap content
   */
  wrap: PropTypes.bool,
  /**
   * height property (for parent secondary axis)
   */
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * width property (for parent secondary axis)
   */
  width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /**
   * DEPRECATED: use "basis" instead
   */
  flexBasis: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  className: PropTypes.string,
  style: PropTypes.object
};

export default class FlexView extends React.Component {

  static propTypes = propTypes

  getGrow = () => {
    const { grow } = this.props;
    if (typeof grow === 'number') {
      return grow;
    } else if (grow) {
      return 1;
    } else {
      return 0; // auto === true or default
    }
  }

  getShrink = () => {
    const { shrink, basis, flexBasis, auto } = this.props;
    if (typeof shrink === 'number') {
      return shrink;
    } else if (shrink) {
      return 1;
    } else if (shrink === false) {
      return 0;
    }


    if (basis || flexBasis || auto) {
      return 0;
    } else {
      return 1; // grow === true or default
    }
  }

  getBasis = () => {
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
  }

  getFlexStyle = () => {
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
  }

  getStyle = () => {
    const style = pick(this.props, [
      'width',
      'height',
      'marginLeft',
      'marginTop',
      'marginRight',
      'marginBottom'
    ]);
    return { ...this.getFlexStyle(), ...style, ...this.props.style };
  }

  getContentAlignmentClasses = () => {
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
  }

  getClasses = () => {
    const direction = this.props.column ? 'flex-column' : 'flex-row';
    const contentAlignment = this.getContentAlignmentClasses();
    const wrap = this.props.wrap && 'flex-wrap';
    return cx('react-flex-view', direction, contentAlignment, wrap, this.props.className);
  }

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

}
