import { PureComponent, ReactNode } from 'react';

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
    title?: ReactNode | string, // TODO(typo): wtf
    hideTitleWhenExpanded?: boolean,
    menu?: any
  }
}

export type PanelProps = {
  children: ReactNode,
  type: 'docked-top' | 'docked-left' | 'docked-bottom' | 'docked-bottom' | 'floating',
  header?: PanelProps.Header,
  loading?: boolean,
  dark?: boolean,
  softLoading?: boolean,
  softLoadingDelay?: boolean,
  className?: string,
  clearMargin?: 'top' | 'left' | 'bottom' | 'right',
  style?: Object
}

export default class Panel extends PureComponent<PanelProps, void> {}
