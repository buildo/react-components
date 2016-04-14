import React from 'react';
import { props, t, pure, skinnable } from '../utils';
import FlexView from '../flex/FlexView';
import Icon from '../Icon/Icon';

const icons = {
  up: ['angle-up', 'angle-down'],
  left: ['angle-left', 'angle-right'],
  down: ['angle-down', 'angle-up'],
  right: ['angle-right', 'angle-left']
};

@pure
@skinnable()
@props({
  collapse: t.maybe(t.struct({
    isExpanded: t.Bool,
    direction: t.enums.of(Object.keys(icons)),
    onToggleExpanded: t.Func
  })),
  title: t.maybe(t.ReactChildren),
  content: t.maybe(t.ReactChildren),
  menu: t.maybe(t.ReactChildren)
})
export default class PanelHeader extends React.Component {

  getIcon = (collapse) => {
    const { direction, isExpanded } = collapse;
    return isExpanded ? icons[direction][0] : icons[direction][1];
  };

  getLocals() {
    const { collapse, content, title, menu } = this.props;
    const verticalDirection = collapse && (collapse.direction === 'up' || collapse.direction === 'down');
    const renderExpandIcon = !!collapse;
    const renderInnerHeader = !collapse || collapse && (collapse.isExpanded || verticalDirection);
    const renderTitle = title && renderInnerHeader;
    const renderContent = content && renderInnerHeader;
    const renderMenu = menu && renderInnerHeader;
    return {
      collapse,
      content,
      title,
      menu,
      renderExpandIcon,
      renderTitle,
      renderContent,
      renderMenu
    };
  }

  templateExpandIcon = ({ collapse }) => {
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
  };

  templateTitle = ({ renderTitle, title, renderExpandIcon, collapse }) => {
    return (
      <FlexView vAlignContent='center' shrink={false} onClick={renderExpandIcon && collapse.onToggleExpanded} className='panel-header-title-wrapper'>
        {renderExpandIcon && this.templateExpandIcon({ collapse })}
        {renderTitle && <FlexView className='panel-header-title'>{title}</FlexView>}
      </FlexView>
    );

  };

  templateContent = ({ renderContent, content }) => {
    return (
      renderContent ?
        <FlexView className='panel-header-content' vAlignContent='center' grow shrink={false}>
          {content}
        </FlexView>
        : null
    );
  };

  template({ collapse, content, title, menu, renderExpandIcon, renderTitle, renderContent, renderMenu }) {
    return (
      <FlexView className='panel-header' basis={40}>
        {this.templateTitle({ renderTitle, title, renderExpandIcon, collapse })}
        {this.templateContent({ renderContent, content })}
        {renderMenu && menu}
      </FlexView>
    );
  }

}
