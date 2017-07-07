import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';
import { PanelHeaderProps } from './PanelHeader';

export namespace PanelProps {

  type Header = {
    collapse?: {
      direction: 'up' | 'left' | 'down' | 'right',
      onExpand: () => void,
      onCollapse: () => void,
      isCollapsed?: boolean
    },
    size?: PanelHeaderProps.HeaderSize,
    content?: any, // TODO: t.ReactChildren
    title?: any, // TODO(typo): wtf
    hideTitleWhenExpanded?: boolean,
    menu?: any // TODO: t.ReactChildren
  }
}

export type PanelProps = {
  children: any,
  type: 'docked-top' | 'docked-left' | 'docked-bottom' | 'docked-bottom' | 'floating',
  header?: PanelProps.Header,
  loading?: boolean,
  dark?: boolean,
  softLoading?: boolean,
  softLoadingDelay?: number, // TODO: should be non negative
  className?: string,
  clearMargin?: 'top' | 'left' | 'bottom' | 'right',
  style?: CSSProperties
}

export default class Panel extends PureComponent<PanelProps> {}

export const Props: {
  [key: string]: Type<any>
}
