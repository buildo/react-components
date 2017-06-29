import { CSSProperties, PureComponent } from 'react';

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
    content?: any,
    title?: any,
    hideTitleWhenExpanded?: boolean,
    menu?: any
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

export default class Panel extends PureComponent<PanelProps, void> {}
