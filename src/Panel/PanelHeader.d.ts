import { PureComponent, ReactChildren } from 'react';
import { Type } from 'tcomb';

export namespace PanelHeaderProps {
  type HeaderSize = 'tiny' | 'small' | 'medium';
}

// TODO: generalize with Panel.Props
export type PanelHeaderProps = {
  collapse?: {
    direction: 'up' | 'left' | 'down' | 'right',
    onToggleExpanded: () => void,
    isExpanded?: boolean
  },
  size?: PanelHeaderProps.HeaderSize,
  content?: any, // TODO: t.ReactChildren
  title?: any, // TODO: t.ReactChildren
  menu?: any // TODO: t.ReactChildren
}

export default class PanelHeader extends PureComponent<PanelHeaderProps> {}

export const Props: {
  [key: string]: Type<any>
}
export const HeaderSize: PanelHeaderProps.HeaderSize

