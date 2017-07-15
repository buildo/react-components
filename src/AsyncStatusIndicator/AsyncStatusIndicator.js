import React from 'react';
import { skinnable, props, t } from '../utils';
import cx from 'classnames';
import View from 'react-flexview';

export const AsyncStatusIndicatorState = t.enums.of([
  'ready',
  'processing',
  'success',
  'error'
], 'AsyncStatusIndicatorState');

export const Props = {
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
@skinnable()
@props(Props)
export default class AsyncStatusIndicator extends React.PureComponent {

  getLocals({ state, icons, labels, className, style }) {
    const icon = icons[state] || null;
    const label = labels[state] || '';

    return { state, icon, label, className, style };
  }

  template({ state, icon, label, className, style }) {
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
