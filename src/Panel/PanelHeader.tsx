import * as React from 'react';
import { props, t, stateClassUtil, ReactChildren } from '../utils';
import FlexView from 'react-flexview';
import { Icon } from '../Icon/Icon';
import * as cx from 'classnames';

export type CollapseDirection =  'up' | 'left' | 'down' | 'right';
export type HeaderSize = 'tiny' | 'small' | 'medium';
export type Collapse = {
  direction: CollapseDirection,
  onToggleExpanded: () => void,
  isExpanded?: boolean
}

export type PanelHeaderDefaultProps = {
  size: HeaderSize
}

export type PanelHeaderRequiredProps = {
  collapse?: Collapse,
  content?: React.ReactNode,
  title?: React.ReactNode
  menu?: React.ReactNode
}

export type PanelHeaderDefaultedProps = PanelHeaderRequiredProps & PanelHeaderDefaultProps;

export namespace PanelHeader {
  export type Props = PanelHeaderRequiredProps & Partial<PanelHeaderDefaultProps>;
}

const icons = {
  up: ['angle-up', 'angle-down'],
  left: ['angle-left', 'angle-right'],
  down: ['angle-down', 'angle-up'],
  right: ['angle-right', 'angle-left']
};

const headerSizes = ['tiny', 'small', 'medium'];
export const HeaderSize = t.enums.of(headerSizes, 'HeaderSize');

@props({
  collapse: t.maybe(t.struct({
    isExpanded: t.Boolean,
    direction: t.enums.of(Object.keys(icons)),
    onToggleExpanded: t.Function
  })),
  size: HeaderSize,
  title: t.maybe(ReactChildren),
  content: t.maybe(ReactChildren),
  menu: t.maybe(ReactChildren)
})
export class PanelHeader extends React.PureComponent<PanelHeader.Props> {

  static defaultProps: PanelHeaderDefaultProps = {
    size: 'small'
  };

  getIcon = (collapse: Collapse) => {
    const { direction, isExpanded } = collapse;
    return isExpanded ? icons[direction][0] : icons[direction][1];
  }

  render() {
    const { collapse, size, content, title, menu } = this.props as PanelHeaderDefaultedProps;
    const verticalDirection = !!collapse && (collapse.direction === 'up' || collapse.direction === 'down');
    const renderInnerHeader = !collapse || collapse && (collapse.isExpanded || verticalDirection);
    const renderTitle = !!title && renderInnerHeader;
    const renderContent = !!content && renderInnerHeader;
    const renderMenu = menu && renderInnerHeader;
    const height = size === HeaderSize('tiny') ? 40 : size === HeaderSize('medium') ? 56 : 48;
    const className = cx('panel-header', stateClassUtil([size]));

    return (
      <FlexView className={className} basis={height}>
        {this.templateTitle({ renderTitle, title, collapse })}
        {this.templateContent({ renderContent, content })}
        {renderMenu && menu}
      </FlexView>
    );
  }

  templateExpandIcon = (collapse: Collapse) => {
    return (
      <FlexView
        vAlignContent='center'
        hAlignContent='center'
        className='panel-header-icon'
      >
        <Icon
          icon={this.getIcon(collapse)}
          className='expand-icon'
        />
      </FlexView>
    );
  }

  templateTitle = ({ renderTitle, title, collapse }: {
    renderTitle: boolean,
    title: React.ReactNode,
    collapse?: Collapse
  }) => {
    return (
      <FlexView vAlignContent='center' shrink={false} onClick={!!collapse && collapse.isExpanded ? collapse.onToggleExpanded : undefined} className='panel-header-title-wrapper'>
        {collapse && this.templateExpandIcon(collapse)}
        {renderTitle && <FlexView className='panel-header-title'>{title}</FlexView>}
      </FlexView>
    );
  }

  templateContent = ({ renderContent, content }: {
    renderContent: boolean,
    content: React.ReactNode
  }) => {
    return (
      renderContent ?
        <FlexView className='panel-header-content' vAlignContent='center' grow shrink={false}>
          {content}
        </FlexView>
        : null
    );
  }
}
