import { PureComponent } from 'react';
import { Type } from 'tcomb';

type ChildrenArgs = {
  isDesktop: boolean,
  isMobile: boolean,
  isPhone: boolean,
  isTablet: boolean
};

export type MobileDetectorProps = {
  children: (childrenArgs: ChildrenArgs) => JSX.Element
  forceDesktop?: boolean,
  userAgent?: string
}

export const Props: {
  [key: string]: Type<any>
}

export default class MobileDetector extends PureComponent<MobileDetectorProps> {}
