import React from 'react';
import { props, t } from '../../utils';
import Item from './Item';
import CollapsableSection from '../../collapsable-section/CollapsableSection';

@props({
  sections: t.maybe(t.Array),
  openSections: t.Array,
  onSelectItem: t.Function,
  onToggleSection: t.maybe(t.Function)
})
export default class SidebarContent extends React.Component {

  isActive = (id) => false && id;

  isOpen = (sectionId) => this.props.openSections.indexOf(sectionId) !== -1;

  onToggle = (id) => () => this.props.onToggleSection(id);

  render() {
    const { sections, onSelectItem } = this.props;
    const getItems = (sectionId, items) => items.map(({ id, ...item }) =>
      <Item {...item} id={id} onClick={onSelectItem} sectionId={sectionId} indent active={this.isActive(id)} key={id} />
    );

    const getSections = (sections) => sections.map(({ id, components, contents, title }) => (
      <CollapsableSection onChange={this.onToggle(id)} isOpen={this.isOpen(id)} header={title} icons={{ open: 'angle-up', closed: 'angle-down' }} key={id}>
        <div className='items'>
          {getItems(id, components || contents)}
        </div>
      </CollapsableSection>
    ));

    return (
      <div className='sidebar-content'>
        {getSections(sections)}
      </div>
    );
  }

}
