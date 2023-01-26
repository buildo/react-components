import * as React from 'react';
import cx from 'classnames';

export type DividerDefaultProps = {
  /** divider orientation (vertical | horizontal) */
  orientation: Divider.Orientation;
  /** size of margins */
  size: Divider.Size;
  /** an optional style object to pass to top level element of the component */
  style: React.CSSProperties;
  /** an optional class name to pass to first inner element of the component */
  className?: string;
};

export namespace Divider {
  export type Orientation = 'horizontal' | 'vertical';
  export type Size = 'small' | 'medium' | 'large' | 'no-margin';
  export type Props = Partial<DividerDefaultProps>;
}
type DividerDefaultedProps = DividerDefaultProps;

/**
 * A simple component used to visually divide UI elements
 */
export class Divider extends React.PureComponent<Divider.Props> {
  static defaultProps: DividerDefaultProps = {
    orientation: 'vertical',
    size: 'small',
    style: {}
  };

  render() {
    const { orientation, style, size, className } = this.props as DividerDefaultedProps;
    return <div className={cx('divider', className, orientation, size)} style={style} />;
  }
}
