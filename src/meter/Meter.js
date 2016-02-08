import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import FlexView from '../flex/FlexView';
import find from 'lodash/collection/find';

const Range = t.refinement(t.struct({
  startValue: t.Number,
  endValue: t.Number,
  fillingColor: t.String,
  labelColro: t.String
}), r => r.startValue < r.endValue);

const labelFormatter = (currentValue, startValue, endValue) =>(
  +(Math.round( currentValue * 100 / Math.abs(startValue - endValue) + 'e+2')  + 'e-2')+'%'
);
/**
 * ### Renders a Progress Bar
 */
@skinnable()
@props({
  /**
   * This is the value provided as input.
   */
  currentValue: t.Number,
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
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Meter extends React.Component{

  static defaultProps = {
    minValue: 0,
    maxValue: 100,
    labelFormatter
  };

  getSteps = () => {
    const {
      steps,
      minValue,
      maxValue
    } = this.props;

    if(steps){
      return steps;
    }
    return [{
      startValue: minValue,
      endValue: maxValue,
      fillingColor: '#ccc',
      labelColor: '#000'
    }];
  }

  getResultFromCurrentValue = ({ currentValue, minValue, maxValue }) =>{
    return +(Math.round( currentValue * 100 / Math.abs(minValue - maxValue) + 'e+2')  + 'e-2'); //to be checked, not work as expected for range and negative
  };

  getStyles = () => {
    const {
      currentValue,
      minValue,
      maxValue
    } = this.props;
    const step = find(this.getSteps(), ({ startValue, endValue })  => {
      return currentValue >= startValue && currentValue <= endValue; //To be checked, allow overlapping atm
    });
    const result = this.getResultFromCurrentValue({ currentValue, minValue, maxValue });
    return {
      wrapperStyle: {
        width: result+'%',
        height: '100%',
        backgroundColor: step.fillingColor
      },
      labelStyle: {
        color: step.labelColor
      }
    };
  }

  getLocals(){
    const {
      className,
      ...props
    } = this.props;

    const styles = this.getStyles();

    return {
      ...props,
      className: cx('meter', className),
      steps: this.getSteps(),
      style: styles.wrapperStyle,
      labelStyle: styles.labelStyle,
      fillingStyle: styles.fillingStyle
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
          {locals.labelFormatter(locals.currentValue, locals.minValue, locals.maxValue)}
        </FlexView>
      </FlexView>
    );
  }

}
