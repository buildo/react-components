import { PureComponent, ReactChildren } from 'react';
import { Type } from 'tcomb';
import { PanelProps } from './Panel';


// TODO: generalize with Panel.Props
export type PanelHeaderProps = {
  collapse?: {
    direction: PanelProps.CollapseDirection,
    onToggleExpanded: () => void,
    isExpanded?: boolean
  },
  size?: PanelProps.HeaderSize,
  content?: any, // TODO: t.ReactChildren
  title?: any, // TODO: t.ReactChildren
  menu?: any // TODO: t.ReactChildren
}

export default class PanelHeader extends PureComponent<PanelHeaderProps> {}

export const Props: {
  [key: string]: Type<any>
}
export const HeaderSize: PanelProps.HeaderSize

