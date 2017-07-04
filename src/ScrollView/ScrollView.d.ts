import { CSSProperties, PureComponent, ComponentType } from 'react';
import { Type } from 'tcomb';

export type ScrollViewProps = {
  children: any,
  autoshow?: boolean,
  forceGemini?: boolean,
  component?: string | ComponentType,
  componentProps?: { [p: string]: any },
  className?: string,
  style?: CSSProperties
}

export const Props: {
  [key: string]: Type<any>
};

export default class ScrollView extends PureComponent<ScrollViewProps> {}
