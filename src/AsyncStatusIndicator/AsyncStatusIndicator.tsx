import * as React from 'react';
import { props, t, ReactElement } from '../utils';
import cx from '../utils/classnames';
import View from 'react-flexview';

export namespace AsyncStatusIndicatorProps {
  export type AsyncStatusIndicatorState = 'ready' | 'processing' | 'success' | 'error';
}

export type AsyncStatusIndicatorProps = {
  /** The state of the component */
  state: AsyncStatusIndicatorProps.AsyncStatusIndicatorState,
  /** an optional class name to pass to top level element of the component */
  className?: string,
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties,
  /** a dictionary of ReactElements for each state */
  icons: { [key in AsyncStatusIndicatorProps.AsyncStatusIndicatorState]?: any },
  /** a dictionary labels for each state */
  labels: { [key in AsyncStatusIndicatorProps.AsyncStatusIndicatorState]?: string },
}

export const AsyncStatusIndicatorState = t.enums.of([
  'ready',
  'processing',
  'success',
  'error'
], 'AsyncStatusIndicatorState');

export const Props = {
  state: AsyncStatusIndicatorState,
  icons: t.dict(AsyncStatusIndicatorState, ReactElement),
  labels: t.dict(AsyncStatusIndicatorState, t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A component that shows the status of an async operation */
@props(Props)
export default class AsyncStatusIndicator extends React.PureComponent<AsyncStatusIndicatorProps> {
  render() {
    const { state, icons, labels, className, style } = this.props;
    const icon = icons[state] || null;
    const label = labels[state] || '';

    return (
      <View vAlignContent='center' className={cx('async-status-indicator', state, className)} style={style}>

        {icon && (
          <View
            vAlignContent='center'
            hAlignContent='center'
            className='async-status-indicator-icon'
          >
            {icon}
          </View>
        )}

        {label && (
          <View vAlignContent='center' className='async-status-indicator-label'>
            {label}
          </View>
        )}

      </View>
    );
  }
}
