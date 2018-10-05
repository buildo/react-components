import * as React from 'react';
import { props, t } from '../utils';
import * as cx from 'classnames';

export type DividerDefaultProps = {
  /** divider orientation (vertical | horizontal) */
  orientation: Divider.Orientation,
  /** size of margins */
  size: Divider.Size,
  /** an optional style object to pass to top level element of the component */
  style: React.CSSProperties,
  /** an optional class name to pass to first inner element of the component */
  className?: string;
};

export namespace Divider {
  export type Orientation = 'horizontal' | 'vertical'
  export type Size = 'small' | 'medium' | 'large' | 'no-margin'
  export type Props = Partial<DividerDefaultProps>;
}
type DividerDefaultedProps = DividerDefaultProps;

const orientation = t.enums.of(['horizontal', 'vertical'], 'orientation');
const sizeType = t.enums.of(['small', 'medium', 'large', 'no-margin'], 'sizeType');

export const Props = {
  orientation: t.maybe(orientation),
  style: t.maybe(t.Object),
  size: t.maybe(sizeType),
  className: t.maybe(t.String)
};

/**
 * A simple component used to visually divide UI elements
 */
@props(Props)
export class Divider extends React.PureComponent<Divider.Props> {

  static defaultProps: DividerDefaultProps = {
    orientation: 'vertical',
    size: 'small',
    style: {}
  };

  render() {
    const { orientation, style, size, className } = this.props as DividerDefaultedProps;
    return (
      <div className={cx('divider', className, orientation, size)} style={style} />
    );
  }
}
