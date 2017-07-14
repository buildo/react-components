import { CSSProperties, PureComponent, UIEventHandler } from 'react';
import { Type } from 'tcomb';

export type ScrollViewProps = {
  children: any,
  scrollX?: boolean,
  scrollY?: boolean,
  scrollPropagation?: boolean,
  easing?: 'linear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInOutSine'
    | 'easeInExpo'
    | 'easeOutExpo'
    | 'easeInOutExpo'
    | 'easeInCirc'
    | 'easeOutCirc'
    | 'easeInOutCirc',
  onScroll?: UIEventHandler<HTMLElement>,
  style?: CSSProperties,
  [key: string]: any
}

export const Props: {
  [key: string]: Type<any>
}

export default class ScrollView extends PureComponent<ScrollViewProps> {}
