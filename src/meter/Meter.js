import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import FlexView from '../flex/FlexView';
import find from 'lodash/collection/find';

const Range = t.refinement(t.struct({
  startValue: t.Number,
  endValue: t.Number,
  fillingColor: t.maybe(t.String),
  labelColor: t.maybe(t.String)
}), r => r.startValue < r.endValue, 'Range');

const computeResult = (current, min, max) => {
  return Math.abs((current - min) * 100 / (max - min));
};

const labelFormatter = (current, min, max) => {
  return `${computeResult(current, min, max)}%`;
};
/**
 * ### Renders a Progress Bar
 */
@skinnable()
@props({
  /**
   * This is the value provided as input.
   */
  current: t.Number,
  /**
   * Minimum value.
   */
  minValue: t.maybe(t.Number),
  /**
   * Maximum value.
   */
  maxValue: t.maybe(t.Number),
  /**
   * Function as input in which you can define a custom label format.
   */
  labelFormatter: t.maybe(t.Function),
  /**
   * Array of Object in which you can define startValue, endValue, labelColor, fillingColor.
   */
  steps: t.maybe(t.list(Range)),
  defaultLabelColor: t.maybe(t.String),
  defaultFillingColor: t.maybe(t.String),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Meter extends React.Component{

  static defaultProps = {
    minValue: 0,
    maxValue: 100,
    defaultFillingColor: '#ccc',
    defaultLabelColor: '#000',
    labelFormatter
  };

  /*
  validatedSteps = (steps) => {
    if (steps){
      return steps.reduce(( memo, curr, index, arr ) => {
        if (index === 1){
          memo.startValue = curr.startValue || this.props.minValue;
        }
        curr.startValue = curr.startValue || arr[index-1].endValue + 1; //scale to be defined
        return memo;
      });
    }
  };*/

  computeStyle = () => {
    const {
      current,
      minValue,
      maxValue,
      steps,
      defaultFillingColor,
      defaultLabelColor
    } = this.props;

    const step = find(steps, ({ startValue, endValue })  => {
      return current >= startValue && current <= endValue; //To be checked, allow overlapping atm
    });
    return {
      wrapperStyle: {
        width: `${computeResult(current, minValue, maxValue)}%`,
        height: '100%',
        backgroundColor: step ? step.fillingColor : defaultFillingColor
      },
      labelStyle: {
        color: step ? step.labelColor : defaultLabelColor
      }
    };
  }

  getLocals(){
    const {
      className,
      ...props
    } = this.props;

    const styles = this.computeStyle();

    return {
      ...props,
      className: cx('meter', className),
      style: styles.wrapperStyle,
      labelStyle: styles.labelStyle
    };
  }

  template({ className, style, labelStyle, ...locals }){
    return (
      <FlexView
        className={className}
        grow
        row
        style={style}
      >
        <FlexView
          className='bar'
          grow
          hAlignContent='left'
        />
        <FlexView
          className='label'
          grow
          hAlignContent='right'
          style={labelStyle}
        >
          {locals.labelFormatter(locals.current, locals.minValue, locals.maxValue)}
        </FlexView>
      </FlexView>
    );
  }

}
