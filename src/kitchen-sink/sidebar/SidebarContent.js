import React from 'react';
import { props, t } from '../../utils';
import Item from './Item';
import SingleItemSection from './SingleItemSection';
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

  getItems = (sectionId, items) => items.map(({ id, ...item }) =>
    <Item
      title={item.title}
      id={id}
      onClick={this.props.onSelectItem}
      sectionId={sectionId}
      active={this.isActive(id)}
      key={id}
    />
  );

  getSections = (sections) => sections.map(({ id: sectionId, components, contents, title }) => {
    if ((components || contents).length > 1) {
      return (
        <CollapsableSection onChange={this.onToggle(sectionId)} isOpen={this.isOpen(sectionId)} header={title} icons={{ open: 'angleUpsvg', closed: 'angleDown' }} key={sectionId}>
          <div className='items'>
            {this.getItems(sectionId, components || contents)}
          </div>
        </CollapsableSection>
      );
    } else {
      const { id } = (components || contents)[0];
      return (
        <SingleItemSection
          {...{ title, id, sectionId }}
          onClick={this.props.onSelectItem}
          active={this.isActive(id)}
          key={sectionId}
        />
      );
    }
  });

  render() {
    return (
      <div className='sidebar-content'>
        <View className='logo' vAlignContent='center' hAlignContent='center' column onClick={this.toHome}>
          buildo
          <View className='sub'>React components</View>
        </View>
        {this.getSections(this.props.sections)}
      </div>
    );
  }

}
