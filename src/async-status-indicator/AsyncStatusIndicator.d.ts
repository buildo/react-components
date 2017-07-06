import { CSSProperties, PureComponent } from 'react';
import { Enums, Type } from 'tcomb';

export namespace AsyncStatusIndicatorProps {
  type AsyncStatusIndicatorState = 'ready' | 'processing' | 'success' | 'error';
}

export type AsyncStatusIndicatorProps = {
  state: AsyncStatusIndicatorProps.AsyncStatusIndicatorState,
  icons: { [key in AsyncStatusIndicatorProps.AsyncStatusIndicatorState]?: any },
  labels: { [key in AsyncStatusIndicatorProps.AsyncStatusIndicatorState]?: string },
  className?: string,
  style?: CSSProperties
}

export default class AsyncStatusIndicator extends PureComponent<AsyncStatusIndicatorProps> {}

export const AsyncStatusIndicatorState: Enums;

export const Props: {
  [key: string]: Type<any>
}
