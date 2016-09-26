import React from 'react';
import { props, t } from '../../utils';
import Item from './Item';
import SingleItemSection from './SingleItemSection';
import CollapsableSection from '../../collapsable-section/CollapsableSection';
import Scroll from '../../scroll/ScrollView';
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
        <View shrink={false} column key={sectionId}>
          <CollapsableSection onChange={this.onToggle(sectionId)} isOpen={this.isOpen(sectionId)} header={title} icons={{ open: 'angleUpsvg', closed: 'angleDown' }}>
            <div className='items'>
              {this.getItems(sectionId, components || contents)}
            </div>
          </CollapsableSection>
        </View>
      );
    } else {
      const { id } = (components || contents)[0];
      return (
        <View column shrink={false} key={sectionId}>
          <SingleItemSection
            {...{ title, id, sectionId }}
            onClick={this.props.onSelectItem}
            active={this.isActive(id)}
          />
        </View>
      );
    }
  });

  render() {
    return (
      <Scroll className='sidebar-content' scrollPropagation={false}>
        <View className='logo' vAlignContent='center' hAlignContent='center' column onClick={this.toHome} shrink={false}>
          buildo
          <View className='sub'>React components</View>
        </View>
        {this.getSections(this.props.sections)}
      </Scroll>
    );
  }

}
