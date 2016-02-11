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

  const isOverlapped = (range1, range2) => (
    Math.max(range1.startValue, range2.startValue) < Math.min(range1.endValue, range2.endValue)
  );

  const noOverlappingRanges = ranges => {
    return every(ranges, (range1, i) => {
      return every(ranges.slice(0, i).concat(ranges.slice(i + 1)), range2 => {
        return !isOverlapped(range1, range2);
      });
    });
  };

  return noOverlappingRanges(rangeList);
}, 'Ranges');

const computePercentage = (value, min, max) => (
  Math.abs((value - min) * 100 / (max - min))
);

const labelFormatter = (value, min, max) => (
  `${computePercentage(value, min, max)}%`
);

/**
 * ### Renders a Meter
 */
@skinnable()
@props({
  /**
   * This is the value provided as input.
   */
  value: t.Number,
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
  ranges: t.maybe(Ranges),
  /**
   * String as color for label.
   */
  baseLabelColor: t.maybe(t.String),
  /**
   * String as color for bar.
   */
  baseFillingColor: t.maybe(t.String),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Meter extends React.Component {

  static defaultProps = {
    min: 0,
    max: 100,
    labelFormatter
  };

  computeStyles = () => {
    const {
      value,
      min,
      max,
      ranges,
      baseFillingColor,
      baseLabelColor
    } = this.props;

    const range = find(ranges, ({ startValue, endValue })  => (
      value >= startValue && value <= endValue
    ));
    return {
      basisSize: `${computePercentage(value, min, max)}%`,
      fillingStyle: {
        backgroundColor: range ? range.fillingColor : baseFillingColor
      },
      labelStyle: {
        color: range ? range.labelColor : baseLabelColor
      }
    };
  }

  getLocals() {
    const {
      className,
      ...props
    } = this.props;

    const styles = this.computeStyles();

    return {
      ...props,
      className: cx('meter', className),
      fillingStyle: styles.fillingStyle,
      labelStyle: styles.labelStyle,
      basisSize: styles.basisSize
    };
  }

  template({ id, className, style, fillingStyle, labelStyle, basisSize, ...locals }) {
    return (
      <FlexView {...{ id, className, style }} grow>
        <FlexView className='bar' grow>
          <FlexView
            className='filling'
            basis={basisSize}
            style={fillingStyle}
          />
        </FlexView>
        <FlexView
          className='label'
          shrink={false}
          style={labelStyle}
        >
          {locals.labelFormatter(locals.value, locals.min, locals.max)}
        </FlexView>
      </FlexView>
    );
  }

}
