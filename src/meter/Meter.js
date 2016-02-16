import React from 'react';
import { props, t, skinnable } from '../utils';
import { warn } from '../utils/log';
import cx from 'classnames';
import FlexView from '../flex/FlexView';
import find from 'lodash/collection/find';
import every from 'lodash/collection/every';
import isEqual from 'lodash/lang/isEqual';
import sortBy from 'lodash/collection/sortBy';

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

const Props = t.refinement(t.struct({
  /**
   * Current value.
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
   * Function in which you can define a custom label format.
   */
  labelFormatter: t.maybe(t.Function),
  /**
   * Array of Object in which you can define startValue, endValue, labelColor, fillingColor.
   */
  ranges: t.maybe(Ranges),
  /**
   * Fallback labelColor.
   */
  baseLabelColor: t.maybe(t.String),
  /**
   * Fallback fillingColor.
   */
  baseFillingColor: t.maybe(t.String),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ min, max }) => min < max, 'Props');

const isFullyFilled = (ranges, min, max) => {
  const comparableRanges = ranges.concat({ startValue: max, endValue: min });
  const sortedStartValueList = sortBy(comparableRanges, 'startValue').map(range => range.startValue);
  const sortedEndValueList = sortBy(comparableRanges, 'endValue').map(range => range.endValue);
  return isEqual(sortedStartValueList, sortedEndValueList);
};

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
@props(Props)
export default class Meter extends React.Component {

  static defaultProps = {
    min: 0,
    max: 100,
    labelFormatter
  };

  componentDidMount() {
    this.logWarnings();
  }

  logWarnings = () => {
    const {
      ranges,
      max,
      min,
      baseFillingColor
    } = this.props;
    warn(() => {
      if (isFullyFilled(ranges, min, max) && baseFillingColor) {
        return 'baseFillingColor not needed, ranges are fully filled';
      }
    });
    warn(() => {
      if (!(isFullyFilled(ranges, min, max) || baseFillingColor)) {
        return 'You should pass baseFillingColor, ranges are not fully filled';
      }
    });
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
      labelFormatter,
      ...props
    } = this.props;

    const styles = this.computeStyles();

    return {
      ...props,
      className: cx('meter', className),
      fillingStyle: styles.fillingStyle,
      labelStyle: styles.labelStyle,
      basisSize: styles.basisSize,
      formattedLabel: labelFormatter(props.value, props.min, props.max)
    };
  }

  template({ id, className, style, fillingStyle, labelStyle, basisSize, formattedLabel }) {
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
          {formattedLabel}
        </FlexView>
      </FlexView>
    );
  }
}
