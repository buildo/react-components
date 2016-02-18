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
  title: t.maybe(t.ReactNode),
  content: t.maybe(t.ReactNode),
  menu: t.maybe(t.ReactNode)
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

  templateExpandIcon = ({ renderExpandIcon, collapse }) => {
    return (
      renderExpandIcon ?
        <FlexView
          auto
          vAlignContent='center'
          hAlignContent='center'
          style={{ cursor: 'pointer' }}
          className='panel-header-icon'
          basis={30}
          onClick={collapse.onToggleExpanded}
        >
          <Icon
            icon={this.getIcon(collapse)}
            className='expand-icon'
          />
        </FlexView>
        : null
    );
  };

  templateTitle = ({ renderTitle, title }) => {
    return (
      renderTitle ?
        <FlexView auto vAlignContent='center' className='panel-header-title' shrink={false}>
          {title}
        </FlexView>
        : null
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
        {this.templateExpandIcon({ renderExpandIcon, collapse })}
        {this.templateTitle({ renderTitle, title })}
        {this.templateContent({ renderContent, content })}
        {renderMenu && menu}
      </FlexView>
    );
  }

}
