import React from 'react';
import Item from './Item';
import Accordion from './Accordion/Accordion';

export default class SidebarContent extends React.Component {

  static propTypes = {
    sections: React.PropTypes.array,
    openSections: React.PropTypes.array.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func
  }

  isActive = (id) => false && id

  isOpen = (sectionId) => this.props.openSections.indexOf(sectionId) !== -1

  onToggle = (id) => () => this.props.onToggleSection(id)

  render() {
    const { sections, onSelectItem } = this.props;
    const getItems = (sectionId, items) => items.map(({ id, ...item }) =>
      <Item {...item} id={id} onClick={onSelectItem} sectionId={sectionId} indent active={this.isActive(id)} key={id} />
    );

    const getSections = (sections) => sections.map(({ id, components, contents, title }) =>
      <Accordion onToggle={this.onToggle(id)} isOpen={this.isOpen(id)} title={title} key={id}>
        {getItems(id, components || contents)}
      </Accordion>);

    return (
      <div className='sidebar-content'>
        {getSections(sections)}
      </div>
    );
  }

}
