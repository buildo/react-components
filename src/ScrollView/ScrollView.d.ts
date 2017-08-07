import { CSSProperties, PureComponent, ComponentType } from 'react';
import { Type } from 'tcomb';

export type ScrollViewProps<CP, ICP> = { // TODO(typo) not really working
  children: any,
  autoshow?: boolean,
  forceGemini?: boolean,
  component?: string | ComponentType<CP>,
  componentProps?: CP,
  innerComponent?: string | ComponentType<ICP>,
  innerComponentProps?: ICP,
  className?: string,
  style?: CSSProperties
}

export const Props: {
  [key: string]: Type<any>
};

export default class ScrollView extends PureComponent<ScrollViewProps<any, any>> {}
