import * as React from 'react';
import cx from 'classnames';
import { Panel } from './Panel';
import FlexView from 'react-flexview';

export namespace TabbedPanel {
  export namespace Tab {
    export type Header =
      | string
      | {
          text: string;
          icon?: JSX.Element;
        };
  }

  export type Tabs = {
    basis?: number;
    headers: Tab.Header[] & { 0: Tab.Header };
    activeIndex?: number;
    onSetActiveTab: (x: number) => void;
  };

  export type Props = {
    tabs: Tabs;
  } & Panel.Props;
}

export class TabbedPanel extends React.PureComponent<TabbedPanel.Props> {
  onSetActiveTab = (activeTabIndex: number) => {
    const {
      tabs: { onSetActiveTab }
    } = this.props;
    onSetActiveTab(activeTabIndex);
  };

  headerTemplate({ headers, activeIndex, onSetActiveTab, basis }: TabbedPanel.Tabs) {
    return (
      <FlexView grow className="tabbed-panel-tabs">
        {headers.map((_header, i) => {
          const header = typeof _header === 'string' ? { text: _header } : _header;
          return (
            <FlexView
              shrink
              basis={basis || '100%'}
              key={i}
              className={cx('tabbed-panel-tab', { active: activeIndex === i })}
              hAlignContent="center"
              vAlignContent="center"
              onClick={onSetActiveTab.bind(null, i)}
            >
              {header.icon && <FlexView className="tabbed-panel-tab-icon">{header.icon}</FlexView>}
              {header.text}
            </FlexView>
          );
        })}
      </FlexView>
    );
  }

  render() {
    const {
      props: { tabs, children, header: panelHeader, className, ...otherPanelProps },
      onSetActiveTab
    } = this;
    const { headers, basis, activeIndex } = tabs;

    return (
      <Panel
        className={cx('tabbed-panel', className)}
        {...otherPanelProps}
        header={{
          collapse: panelHeader ? panelHeader.collapse : undefined,
          title: panelHeader ? panelHeader.title : undefined,
          hideTitleWhenExpanded: true,
          content: this.headerTemplate({
            headers,
            activeIndex,
            onSetActiveTab,
            basis
          }),
          ...panelHeader
        }}
      >
        {children}
      </Panel>
    );
  }
}
