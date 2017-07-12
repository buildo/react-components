import { PureComponent } from 'react';
import { Type } from 'tcomb';
import { PanelProps } from './Panel';

export type TabbedPanelProps = {
  tabs: {
    basis?: number,
    headers: string[],
    activeIndex?: number,
    onSetActiveTab: (x: number) => void
  }
} & PanelProps;

export default class TabbedPanel extends PureComponent<TabbedPanelProps> {}

export const Props: {
  [key: string]: Type<any>
}
