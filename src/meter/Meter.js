import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import FlexView from '../flex/FlexView';
import find from 'lodash/collection/find';
import every from 'lodash/collection/every';

const Range = t.refinement(t.struct({
  startValue: t.Number,
  endValue: t.Number,
  fillingColor: t.maybe(t.String),
  labelColor: t.maybe(t.String)
}), r => r.startValue < r.endValue, 'Range');

const Ranges = t.refinement(t.list(Range), (rangeList) => {
  const startValues = rangeList.map(r => r.startValue);
  const minStartValue = Math.min(...startValues);
  const endValues = rangeList.map(r => r.endValue);
  const maxStartValue = Math.max(...endValues);
  //TODO: check for duplicates
  const stepsWithout = (steps, stepToRemove) => {
    return steps.filter( step => (
      //Object.is(step, stepToRemove)
      !(step.startValue === stepToRemove.startValue && step.endValue === stepToRemove.endValue)
    ));
  };

  const isOverlapped = (step1, step2) => (
    step1.startValue <= step2.endValue && step2.startValue <= step1.endValue
  );
  const noOverlappingRanges = (steps) => {
    return every((steps), step1 => {
      return every(stepsWithout(steps, step1), step2 => {
        return isOverlapped(step1, step2);
      });
    });
  };
  //return globMax === maxStartValue && globMin === minStartValue && noOverlappingRanges;
}, 'Ranges');

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
  steps: t.maybe(Ranges),
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
