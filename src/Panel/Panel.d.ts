import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export namespace PanelProps {

  type HeaderSize = 'tiny' | 'small' | 'medium';

  type CollapseDirection = 'up' | 'left' | 'down' | 'right';

  type Header = {
    collapse?: {
      direction: CollapseDirection,
      onExpand: () => void,
      onCollapse: () => void,
      isCollapsed?: boolean
    },
    size?: HeaderSize,
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
  softLoadingDelay?: number,
  className?: string,
  clearMargin?: 'top' | 'left' | 'bottom' | 'right',
  style?: CSSProperties
}

export default class Panel extends PureComponent<PanelProps> {}

export const Props: {
  [key: string]: Type<any>
}
