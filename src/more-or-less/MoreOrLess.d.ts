import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export type MoreOrLessProps = {
  children: any, // TODO: t.ReactChildren
  expanded: boolean,
  onExpandedChange: (expanded: boolean) => void,
  icons: {
    expanded: string,
    collapsed: string
  },
  wrapperProps?: object,
  className?: string,
  style?: CSSProperties
}

export default class MoreOrLess extends PureComponent<MoreOrLessProps> {}

export var Props: {
  [key: string]: Type<any>
}
