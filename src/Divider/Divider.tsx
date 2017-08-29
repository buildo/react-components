import * as React from 'react';
import { props, t } from '../utils';
import cx from '../utils/classnames';

export namespace DividerProps {
  export type Orientation = 'horizontal' | 'vertical'
  export type Size = 'small' | 'medium' | 'large' | 'no-margin'
};

export type DividerDefaultProps = {
  /** divider orientation (vertical | horizontal) */
  orientation: DividerProps.Orientation,
  /** size of margins */
  size: DividerProps.Size,
  /** an optional style object to pass to top level element of the component */
  style: React.CSSProperties,
};

export type DividerProps = Partial<DividerDefaultProps>;
type DividerDefaultedProps = DividerDefaultProps;

const orientation = t.enums.of(['horizontal', 'vertical'], 'orientation');
const sizeType = t.enums.of(['small', 'medium', 'large', 'no-margin'], 'sizeType');

export const Props = {
  orientation: t.maybe(orientation),
  style: t.maybe(t.Object),
  size: t.maybe(sizeType)
};

/**
 * A simple component used to visually divide UI elements
 */
@props(Props)
export default class Divider extends React.PureComponent<DividerProps> {

  static defaultProps: DividerDefaultProps = {
    orientation: 'vertical',
    size: 'small',
    style: {}
  };

  render() {
    const { orientation, style, size } = this.props as DividerDefaultedProps;
    return (
      <div className={cx('divider', orientation, size)} style={style} />
    );
  }
}
