import { CSSProperties, PureComponent, SyntheticEvent, CompositionEvent } from 'react';

export type BackgroundDimmerProps = {
  children: any, // TODO: t.ReactChildren
  color?: string,
  alpha?: number,
  zIndex?: number,
  stopScrollPropagation?: boolean,
  onClickOutside?: (e: SyntheticEvent<HTMLDivElement>) => void,
  width?: string | number,
  maxWidth?: string | number,
  height?: string | number,
  maxHeight?: string | number,
  className?: string,
  id?: string,
  style?: CSSProperties
}

export default class BackgroundDimmer extends PureComponent<BackgroundDimmerProps> {}
