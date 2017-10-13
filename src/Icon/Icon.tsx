import * as React from 'react';
import range = require('lodash/range');
import { props, t } from '../utils';
import * as cx from 'classnames';

const PositiveInteger = t.refinement(t.Number, x => x % 1 === 0 && x > 0, 'PositiveInteger');

export const Props = {
  icon: t.maybe(t.String),
  color: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  paths: t.maybe(PositiveInteger),
  onClick: t.maybe(t.Function)
};

export type IconDefaultProps = {
  /** number of paths the icon is composed of */
  paths: number,
  /** onClick callback*/
  onClick: React.MouseEventHandler<HTMLElement>,
  /** an optional style object to pass to top level element of the component */
  style: React.CSSProperties
};

export type IconRequiredProps = {
  /** icon className */
  icon?: string,
  /** icon color */
  color?: string,
  /** an optional class name to pass to top level element of the component */
  className?: string,
};

export namespace Icon {
  export type Props = IconRequiredProps & Partial<IconDefaultProps>;
}
type IconDefaultedProps = IconRequiredProps & IconDefaultProps;

/** An icon */
@props(Props)
export class Icon extends React.PureComponent<Icon.Props> {

  static defaultProps: IconDefaultProps = {
    paths: 1,
    onClick: () => {},
    style: {}
  };

  render() {
    const { paths, onClick, className: _className, icon, color, style: _style } = this.props as IconDefaultedProps;
    const className = cx('icon', `icon-${icon}`, _className);
    const style =  { ..._style, color: color || _style.color };

    return icon ? (
      <i className={className} style={style} onClick={onClick}>
        {paths > 1 && range(paths).map(k => <span className={`path${k + 1}`} style={{ fontSize: 'inherit' }} key={k} /> )}
      </i>
    ) : null;
  }

}
