import * as React from 'react';
import * as cx from 'classnames';
import View from 'react-flexview';

export namespace AsyncStatusIndicator {
  export type AsyncStatusIndicatorState = 'ready' | 'processing' | 'success' | 'error';
  export type Props = {
    /** The state of the component */
    state: AsyncStatusIndicatorState;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
    /** a dictionary of ReactElements for each state */
    icons: { [key in AsyncStatusIndicatorState]?: any };
    /** a dictionary labels for each state */
    labels: { [key in AsyncStatusIndicatorState]?: string };
  };
}

/** A component that shows the status of an async operation */
export class AsyncStatusIndicator extends React.PureComponent<AsyncStatusIndicator.Props> {
  render() {
    const { state, icons, labels, className, style } = this.props;
    const icon = icons[state] || null;
    const label = labels[state] || '';

    return (
      <View
        vAlignContent="center"
        className={cx('async-status-indicator', state, className)}
        style={style}
      >
        {icon && (
          <View
            vAlignContent="center"
            hAlignContent="center"
            className="async-status-indicator-icon"
          >
            {icon}
          </View>
        )}

        {label && (
          <View vAlignContent="center" className="async-status-indicator-label">
            {label}
          </View>
        )}
      </View>
    );
  }
}
