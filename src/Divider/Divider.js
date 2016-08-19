import React from 'react';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';

const orientation = t.enums.of(['horizontal', 'vertical'], 'orientation');
const sizeType = t.enums.of(['small', 'medium', 'large', 'no-margin'], 'sizeType');

const dividerProps = {
  orientation: t.maybe(orientation),
  style: t.maybe(t.Obj),
  size: t.maybe(sizeType)
};

const defaultDividerProps = {
  orientation: 'vertical',
  size: 'small',
  style: {}
};

/** A simple component used to visually divide UI elements
 * @param orientation - vertical | horizontal
 * @param size - size of margins
 */
@pure
@skinnable()
@props(dividerProps)
export default class Divider extends React.Component {

  static defaultProps = defaultDividerProps;

  getLocals() {
    return {
      ...this.props
    };
  }

  template({ orientation, style, size }) {
    return (
      <div className={cx('divider', orientation, size)} style={style} />
    );
  }
}
