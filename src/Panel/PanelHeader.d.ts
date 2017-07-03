import { PureComponent, ReactChildren } from 'react';
import { PanelProps } from './Panel';


// TODO: generalize with Panel.Props
export type PanelHeaderProps = {
  collapse?: {
    direction: PanelProps.CollapseDirection,
    onToggleExpanded: () => void,
    isExpanded?: boolean
  },
  size?: PanelProps.HeaderSize,
  content?: any,
  title?: any,
  menu?: any
}

export default class PanelHeader extends PureComponent<PanelHeaderProps> {}
