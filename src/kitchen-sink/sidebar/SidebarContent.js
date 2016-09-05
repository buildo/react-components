import React from 'react';
import { props, t } from '../../utils';
import Item from './Item';
import CollapsableSection from '../../collapsable-section/CollapsableSection';
import View from 'react-flexview';

@props({
  sections: t.maybe(t.Array),
  openSections: t.Array,
  currentItemId: t.maybe(t.String),
  onSelectItem: t.Function,
  onToggleSection: t.maybe(t.Function)
})
export default class SidebarContent extends React.Component {

  isActive = (id) => id === this.props.currentItemId;

  isOpen = (sectionId) => this.props.openSections.indexOf(sectionId) !== -1;

  onToggle = (id) => () => this.props.onToggleSection(id);

  toHome = () => this.props.onSelectItem('home');

  render() {
    const { sections, onSelectItem } = this.props;
    const getItems = (sectionId, items) => items.map(({ id, ...item }) =>
      <Item
        title={item.title}
        id={id}
        onClick={onSelectItem}
        sectionId={sectionId}
        active={this.isActive(id)}
        key={id}
      />
    );

    const getSections = (sections) => sections.map(({ id, components, contents, title }) => (
      <CollapsableSection onChange={this.onToggle(id)} isOpen={this.isOpen(id)} header={title} icons={{ open: 'angleUpsvg', closed: 'angleDown' }} key={id}>
        <div className='items'>
          {getItems(id, components || contents)}
        </div>
      </CollapsableSection>
    ));

    return (
      <div className='sidebar-content'>
        <View className='logo' vAlignContent='center' hAlignContent='center' column onClick={this.toHome}>
          buildo
          <View className='sub'>React components</View>
        </View>
        {getSections(sections)}
      </div>
    );
  }

}
