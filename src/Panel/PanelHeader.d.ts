import { PureComponent, ReactChildren, ReactNode } from 'react';
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
  title?: ReactNode | string, // TODO(typo): wtf
  menu?: ReactChildren
}

export default class PanelHeader extends PureComponent<PanelHeaderProps, void> {}
