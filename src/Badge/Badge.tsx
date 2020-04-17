import * as React from 'react';
import * as cx from 'classnames';
import { Children } from '../utils';
import FlexView from 'react-flexview';

export namespace Badge {
  export type Props = {
    /** the descriptive content of the badge */
    label: Children;
    /** tells if the badge is active (for styling purposes) */
    active?: boolean;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
  };
}

export class Badge extends React.PureComponent<Badge.Props> {
  render() {
    const { label, active, className: _className, style } = this.props;
    const className = cx('badge', { active }, _className);

    return (
      <FlexView vAlignContent="center" hAlignContent="center" {...{ className, style }}>
        <span className="badge-label">{label}</span>
      </FlexView>
    );
  }
}
