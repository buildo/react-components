import * as React from 'react';
import * as cx from 'classnames';
import { props, t } from '../utils';
import Panel, { Props as panelProps, PanelProps } from './Panel';
import FlexView from 'react-flexview';

export namespace TabbedPanelProps {
  export type Tabs = {
    basis?: number,
    headers: string[],
    activeIndex?: number,
    onSetActiveTab: (x: number) => void
  };
}

export type TabbedPanelProps = {
  tabs: TabbedPanelProps.Tabs
} & PanelProps;

export const Props = t.refinement(t.struct({
  ...panelProps,
  tabs: t.struct({
    basis: t.maybe(t.Number),
    headers: t.list(t.String),
    activeIndex: t.maybe(t.Number),
    onSetActiveTab: t.maybe(t.Function)
  })
}), ({ tabs }: any) => tabs.headers.length > 0);

@props(Props)
export default class TabbedPanel extends React.PureComponent<TabbedPanelProps> {

  onSetActiveTab = (activeTabIndex: number) => {
    const { tabs: { onSetActiveTab } } = this.props;
    onSetActiveTab(activeTabIndex);
  };

  headerTemplate({ headers, activeIndex, onSetActiveTab, basis = '100%' }: TabbedPanelProps.Tabs) {
    return (
      <FlexView grow className='tabbed-panel-tabs'>
        {headers.map((header, i) => (
          <FlexView
            shrink
            basis={basis}
            key={i}
            className={cx('tabbed-panel-tab', { active: activeIndex === i })}
            hAlignContent='center'
            vAlignContent='center'
            onClick={onSetActiveTab.bind(null, i)}
          >
            {header}
          </FlexView>
        ))}
      </FlexView>
    );
  }

  render() {
    const { props: { tabs, children, header: panelHeader, className, ...otherPanelProps }, onSetActiveTab } = this;
    const { headers, basis, activeIndex } = tabs;

    return (
      <Panel
        className={cx('tabbed-panel', className)}
        {...otherPanelProps}
        header={{
          collapse: panelHeader ? panelHeader.collapse : undefined,
          title: panelHeader ? panelHeader.title : undefined,
          hideTitleWhenExpanded: true,
          content: this.headerTemplate({ headers, activeIndex, onSetActiveTab, basis }),
          ...panelHeader
        }}
      >
        {children}
      </Panel>
    );
  }

}
