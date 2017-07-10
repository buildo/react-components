import { PureComponent } from 'react';
import { Type } from 'tcomb';

export type ResizeSensorProps = {
  children: any,
  onResize: () => void,
  debounce?: number // TODO: integer
}

export const Props: {
  [key: string]: Type<any>
}

export default class ResizeSensor extends PureComponent<ResizeSensorProps> {}
