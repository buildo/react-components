import React from 'react';
import cx from 'classnames';
import pick from 'lodash/object/pick';
import omit from 'lodash/object/omit';
import { props, t } from '../utils';


const PropTypes = {
  /**
   * FlexView content
   */
  children: t.maybe(t.ReactNode),
  /**
   * flex-direction: column
   */
  column: t.maybe(t.Boolean),
  /**
   * set flex: 0 0 100% NOTE: each property may be overwritten by their own props (grow, shrink, basis)
   */
  auto: t.maybe(t.Boolean),
  /**
   * align content vertically
   */
  vAlignContent: t.maybe(t.enums.of(['top', 'center', 'bottom'])),
  /**
   * align content horizontally
   */
  hAlignContent: t.maybe(t.enums.of(['left', 'center', 'right'])),
  /**
   * margin-left property ("auto" to align self right)
   */
  marginLeft: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * margin-top property ("auto" to align self bottom)
   */
  marginTop: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * margin-right property ("auto" to align self left)
   */
  marginRight: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * margin-bottom property ("auto" to align self top)
   */
  marginBottom: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * flex-grow property (for parent primary axis)
   */
  grow: t.maybe(t.union([ t.Boolean, t.Number ])),
  /**
   * flex-shrink property
   */
  shrink: t.maybe(t.union([ t.Boolean, t.Number ])),
  /**
   * flex-basis property
   */
  basis: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * wrap content
   */
  wrap: t.maybe(t.Boolean),
  /**
   * height property (for parent secondary axis)
   */
  height: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * width property (for parent secondary axis)
   */
  width: t.maybe(t.union([ t.String, t.Number ])),
  /**
   * DEPRECATED: use "basis" instead
   */
  flexBasis: t.maybe(t.union([ t.String, t.Number ])),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};
@props(PropTypes, { strict: false })
export default class FlexView extends React.Component {

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
    const props = omit(this.props, Object.keys(PropTypes));
    return (
      <div className={className} style={style} { ...props }>
        {this.props.children}
      </div>
    );
  }

}
