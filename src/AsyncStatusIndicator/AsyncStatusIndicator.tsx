import * as React from 'react';
import { Type } from 'tcomb';
import { props, t } from '../utils';
import cx from '../utils/classnames';
import View from 'react-flexview';

export namespace AsyncStatusIndicatorProps {
  export type AsyncStatusIndicatorState = 'ready' | 'processing' | 'success' | 'error';
}

export type AsyncStatusIndicatorProps = {
  state: AsyncStatusIndicatorProps.AsyncStatusIndicatorState,
  className?: string,
  style?: React.CSSProperties,
  icons: { [key in AsyncStatusIndicatorProps.AsyncStatusIndicatorState]?: any },
  labels: { [key in AsyncStatusIndicatorProps.AsyncStatusIndicatorState]?: string },
}

export const AsyncStatusIndicatorState: AsyncStatusIndicatorProps.AsyncStatusIndicatorState = t.enums.of([
  'ready',
  'processing',
  'success',
  'error'
], 'AsyncStatusIndicatorState');

export type TProps = {
  [key: string]: Type<any> | AsyncStatusIndicatorProps.AsyncStatusIndicatorState
};

export const Props: TProps = {
  state: AsyncStatusIndicatorState,
  icons: t.dict(AsyncStatusIndicatorState, t.ReactElement),
  labels: t.dict(AsyncStatusIndicatorState, t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A component that shows the status of an async operation
 * @param state - The state of the component
 * @param icons - a dictionary of ReactElements for each state
 * @param labels - a dictionary labels for each state
 * @param className - an optional class name to pass to top level element of the component
 * @param style - an optional style object to pass to top level element of the component
 */
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
