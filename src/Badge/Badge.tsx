import * as React from 'react';
import cx from '../utils/classnames';
import { props, t } from '../utils';
import FlexView from 'react-flexview';

export type BadgeProps = {
  /** the descriptive content of the badge */
  label: React.ReactChildren,
  /** tells if the badge is active (for styling purposes) */
  active?: boolean,
  /** an optional class name to pass to top level element of the component */
  className?: string,
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties
};

export const Props = {
  label: t.ReactChildren,
  active: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
export default class Badge extends React.PureComponent<BadgeProps> {

  render() {
    const { label, active, className: _className, style } = this.props;
    const className = cx('badge', { active }, _className);

    return (
      <FlexView vAlignContent='center' hAlignContent='center' {...{ className, style }}>
        <span className='badge-label'>{label}</span>
      </FlexView>
    );
  }
}
