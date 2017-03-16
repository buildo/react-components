import React from 'react';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';
import View from 'react-flexview';

const AsyncStatusIndicatorState = t.enums.of([
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

/** A simple component used to visually divide UI elements
 * @param state - One of ready | processing | success | error
 * @param icons - a dictionary of [state]: ReactElement
 * @param labels - a dictionary of [state]: string
 * @param className - an optional class name to pass to top level element of the component
 * @param style - an optional style object to pass to top level element of the component
 */
@pure
@skinnable()
@props(Props)
export default class AsyncStatusIndicator extends React.Component {

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
