import { CSSProperties, PureComponent } from 'react';

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

export default class AsyncStatusIndicator extends PureComponent<AsyncStatusIndicatorProps, void> {}
