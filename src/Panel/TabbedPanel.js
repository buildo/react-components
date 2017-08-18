import React from 'react';
import cx from '../utils/classnames';
import { props, t, skinnable } from '../utils';
import Panel, { Props as panelProps } from './Panel';
import FlexView from 'react-flexview';

export const Props = t.subtype(t.struct({
  ...panelProps,
  tabs: t.struct({
    basis: t.maybe(t.Number),
    headers: t.list(t.String),
    activeIndex: t.maybe(t.Num),
    onSetActiveTab: t.maybe(t.Func)
  })
}), ({ tabs }) => tabs.headers.length > 0);

@skinnable()
@props(Props)
export default class TabbedPanel extends React.PureComponent {

  onSetActiveTab = activeTabIndex => {
    const { tabs: { onSetActiveTab } } = this.props;
    onSetActiveTab(activeTabIndex);
  };

  getLocals() {
    const { tabs, children, ...panelProps } = this.props;
    return {
      panelProps,
      headers: tabs.headers,
      content: children,
      basis: tabs.basis,
      activeTabIndex: tabs.activeIndex,
      onSetActiveTab: this.onSetActiveTab
    };
  }

  headerTemplate({ headers, activeTabIndex, onSetActiveTab, basis = '100%' }) {
    return (
      <FlexView grow className='tabbed-panel-tabs'>
        {headers.map((header, i) => (
          <FlexView
            shrink
            basis={basis}
            key={i}
            className={cx('tabbed-panel-tab', { active: activeTabIndex === i })}
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

  template({ headers, content, activeTabIndex, onSetActiveTab, basis, panelProps }) {
    const { header: panelHeader, className, ...otherPanelProps } = panelProps;

    return (
      <Panel
        className={cx('tabbed-panel', className)}
        {...otherPanelProps}
        header={{
          collapse: panelHeader.collapse,
          title: panelHeader.title,
          hideTitleWhenExpanded: true,
          content: this.headerTemplate({ headers, activeTabIndex, onSetActiveTab, basis }),
          ...panelHeader
        }}
      >
        {content}
      </Panel>
    );
  }

}
