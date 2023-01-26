import { useResizeDetector } from 'react-resize-detector';

export namespace ResizeSensor {
  export type Props = {
    /** content */
    children: JSX.Element;
    /** called when a resize event is captured */
    onResize: () => void;
    /** callback delay (milliseconds) */
    debounce?: number;
  };
}

/**
 * A component that exposes an `onResize` callback called whenever his parent's size changes.
 */
export function ResizeSensor({ children, onResize, debounce }: ResizeSensor.Props) {
  useResizeDetector({
    onResize,
    refreshRate: debounce
  });

  return children;
}
