import { PureComponent } from 'react';
import { PanelProps } from './Panel';

export type TabbedPanelProps = {
  tabs: {
    headers: string[],
    activeIndex?: number,
    onSetActiveTab: (x: number) => void
  }
} & PanelProps;

export default class TabbedPanel extends PureComponent<TabbedPanelProps, void> {}
