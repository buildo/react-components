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
  const rangeListNoColor = rangeList.map(r => ( { startValue: r.startValue, endValue: r.endValue }) );

  const isEqual = (step1, step2) => (
    step1.startValue === step2.startValue && step1.endValue === step2.endValue
  );

  const noDuplicateRanges = rangeList => {
    const startValueList = rangeList.map(step => (step.startValue));
    const endValueList = rangeList.map(step => (step.endValue));
    const cleanedStartValueList = Array.from(new Set(startValueList));
    const cleanedEndValueList = Array.from(new Set(endValueList));

    return startValueList.length === cleanedStartValueList.length && endValueList.length === cleanedEndValueList.length;
  };

  const stepsWithout = (steps, stepToRemove) => {
    return steps.filter( step => (
      !isEqual(step, stepToRemove)
    ));
  };

  const isOverlapped = (step1, step2) => (
    Math.max(step1.startValue, step2.startValue) < Math.min(step1.endValue, step2.endValue)
  );

  const noOverlappingRanges = (steps) => {
    return every((steps), step1 => {
      return every(stepsWithout(steps, step1), step2 => {
        return !isOverlapped(step1, step2);
      });
    });
  };

  return noOverlappingRanges(rangeListNoColor) && noDuplicateRanges(rangeListNoColor);
}, 'Ranges');

const Props = t.refinement(t.struct({
  /**
   * This is the value provided as input.
   */
  current: t.Number,
  /**
   * Minimum value.
   */
  min: t.maybe(t.Number),
  /**
   * Maximum value.
   */
  max: t.maybe(t.Number),
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
}), ({ min, max, steps }) => {
  const minStartValue = Math.min(...steps.map(r => r.startValue));
  const maxStartValue = Math.max(...steps.map(r => r.endValue));

  return min === minStartValue && max === maxStartValue;
}, 'Props');

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
@props(Props)
export default class Meter extends React.Component{

  static defaultProps = {
    min: 0,
    max: 100,
    defaultFillingColor: '#ccc',
    defaultLabelColor: '#000',
    labelFormatter
  };

  computeStyle = () => {
    const {
      current,
      min,
      max,
      steps,
      defaultFillingColor,
      defaultLabelColor
    } = this.props;

    const step = find(steps, ({ startValue, endValue })  => {
      return current >= startValue && current <= endValue; //To be checked, allow overlapping atm
    });
    return {
      wrapperStyle: {
        width: `${computeResult(current, min, max)}%`,
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
          {locals.labelFormatter(locals.current, locals.min, locals.max)}
        </FlexView>
      </FlexView>
    );
  }

}
