import React from 'react';
import range from 'lodash/range';
import { skinnable, props, t } from '../utils';
import cx from 'classnames';

const PositiveInteger = t.refinement(t.Number, x => x % 1 === 0 && x > 0, 'PositiveInteger');

export const Props = {
  icon: t.maybe(t.Str),
  color: t.maybe(t.String),
  className: t.maybe(t.Str),
  style: t.maybe(t.Obj),
  paths: t.maybe(PositiveInteger),
  onClick: t.maybe(t.Func)
};

/** An icon
 * @param icon - icon className
 * @param color - icon color
 * @param paths - number of paths the icon is composed of
 * @param onClick - onClick callback
 */
@skinnable()
@props(Props)
export default class Icon extends React.PureComponent {

  static defaultProps = {
    paths: 1,
    onClick: () => {}
  };

  getLocals(props) {
    const { className, icon, color, style = {} } = props;
    return {
      ...props,
      className: cx('icon', `icon-${icon}`, className),
      style: { ...style, color: color || style.color }
    };
  }

  template({ icon, className, style, onClick, paths }) {
    return icon ? (
      <i className={className} style={style} onClick={onClick}>
        {paths > 1 && range(paths).map(k => <span className={`path${k + 1}`} key={k} /> )}
      </i>
    )
    : null;
  }

}
