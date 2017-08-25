import * as React from 'react';
import { props, t } from '../utils';
import { warn } from '../utils/log';
import cx from '../utils/classnames';
import FlexView from 'react-flexview';
import find = require('lodash/find');
import every = require('lodash/every');
import isEqual = require('lodash/isEqual');
import sortBy = require('lodash/sortBy');

const Range = t.refinement(t.struct({
  startValue: t.Number,
  endValue: t.Number,
  fillingColor: t.maybe(t.String),
  labelColor: t.maybe(t.String),
  backgroundColor: t.maybe(t.String)
}), (r: any) => r.startValue < r.endValue, 'Range'); // FIXME: any

const Ranges = t.refinement(t.list(Range), (rangeList) => {

  const isOverlapped = (range1: MeterProps.Range, range2: MeterProps.Range) => (
    Math.max(range1.startValue, range2.startValue) < Math.min(range1.endValue, range2.endValue)
  );

  const noOverlappingRanges = (ranges: MeterProps.Range[]) => {
    return every(ranges, (range1, i) => {
      return every(ranges.slice(0, i).concat(ranges.slice(i + 1)), range2 => {
        return !isOverlapped(range1, range2);
      });
    });
  };

  return noOverlappingRanges(rangeList);
}, 'Ranges');

export const Props = t.refinement(t.struct({
  value: t.Number,
  min: t.maybe(t.Number),
  max: t.maybe(t.Number),
  labelFormatter: t.maybe(t.Function),
  ranges: t.maybe(Ranges),
  baseLabelColor: t.maybe(t.String),
  baseFillingColor: t.maybe(t.String),
  baseBackgroundColor: t.maybe(t.String),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ min, max }) => min < max, 'Props');

const isFullyFilled = (ranges: MeterProps.Range[] | void, min: number, max: number) => {
  if (!ranges) {
    return false;
  }
  const comparableRanges = ranges.concat({ startValue: max, endValue: min });
  const sortedStartValueList = sortBy(comparableRanges, 'startValue').map(range => range.startValue);
  const sortedEndValueList = sortBy(comparableRanges, 'endValue').map(range => range.endValue);
  return isEqual(sortedStartValueList, sortedEndValueList);
};

const computePercentage = (value: number, min: number, max: number) => (
  Math.abs((value - min) * 100 / (max - min))
);

const labelFormatter = (value: number, min: number, max: number) => (
  `${computePercentage(value, min, max)}%`
);

export namespace MeterProps {
  export type Range = {
    startValue: number,
    endValue: number,
    fillingColor?: string,
    labelColor?: string,
    backgroundColor?: string
  }
};

export type MeterDefaultProps = {
  /** minimum value */
  min: number,
  /** maximum value */
  max: number,
  /** function in which you can define a custom label format */
  labelFormatter: (value: number, min: number, max: number) => string,
};

export type MeterRequiredProps = {
  /** current value */
  value: number,
  /** array of Object in which you can define startValue, endValue, labelColor, fillingColor */
  ranges?: MeterProps.Range[],
  /** fallback labelColor */
  baseLabelColor?: string,
  /** fallback fillingColor */
  baseFillingColor?: string,
  /** fallback backgroundColor */
  baseBackgroundColor?: string,
  id?: string,
  className?: string,
  style?: React.CSSProperties
};

export type MeterProps = Partial<MeterDefaultProps> & MeterRequiredProps;

const defaultProps = {
  min: 0,
  max: 100,
  labelFormatter
};

/**
 * A Meter displays a measurement (usually a percentage) on a known scale.
 */
@props(Props)
export default class Meter extends React.Component<MeterProps> {

  componentDidMount() {
    this.logWarnings();
  }

  logWarnings = () => {
    const {
      ranges,
      max,
      min,
      baseFillingColor,
      baseBackgroundColor
    } = this.getProps();
    warn(() => {
      if (isFullyFilled(ranges, min, max) && (baseFillingColor || baseBackgroundColor)) {
        return 'baseFillingColor or baseBackgroundColor is not needed, ranges are fully filled';
      }
      return undefined;
    });
    warn(() => {
      if (!(isFullyFilled(ranges, min, max) || (baseFillingColor && baseBackgroundColor))) {
        return 'You should pass both baseFillingColor and baseBackgroundColor, ranges are not fully filled';
      }
      return undefined;
    });
  };

  computeStyles = () => {
    const {
      value,
      min,
      max,
      ranges,
      baseFillingColor,
      baseLabelColor,
      baseBackgroundColor
    } = this.getProps();

    const range = find(ranges, ({ startValue, endValue }) => (
      value >= startValue && value <= endValue
    ));
    return {
      basisSize: `${computePercentage(value, min, max)}%`,
      fillingStyle: {
        backgroundColor: range ? range.fillingColor : baseFillingColor
      },
      labelStyle: {
        color: range ? range.labelColor : baseLabelColor
      },
      barStyle: {
        backgroundColor: range ? range.backgroundColor : baseBackgroundColor
      }
    };
  }

  getProps() {
    return { ...defaultProps, ...this.props };
  }

  render() {
    const {
      id,
      style,
      className: _className,
      labelFormatter,
      value,
      min,
      max
    } = this.getProps();

    const { basisSize, fillingStyle, labelStyle, barStyle } = this.computeStyles();
    const className = cx('meter', _className);
    const formattedLabel = labelFormatter(value, min, max);

    return (
      <FlexView {...{ id, className, style }} grow>
        <FlexView
          className='bar'
          grow
          style={barStyle}
        >
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
