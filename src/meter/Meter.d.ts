import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export namespace MeterProps {
  // TODO: refinement r.startValue < r.endValue
  type Range = {
    startValue: number,
    endValue: number,
    fillingColor?: string,
    labelColor?: string,
    backgroundColor?: string
  }
}

export type MeterProps = {
  value: number,
  min?: number,
  max?: number,
  labelFormatter?: (value: number, min: number, max: number) => string,
  ranges?: MeterProps.Range[], // TODO: how to check that ranges do not overlap?
  baseLabelColor?: string,
  baseFillingColor?: string,
  baseBackgroundColor?: string,
  id?: string,
  className?: string,
  style?: CSSProperties
}

export default class Meter extends PureComponent<MeterProps> {}

export var Props: {
  [key: string]: Type<any>
}
