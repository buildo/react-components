import React from 'react';
import Item from './Item';

export default class SidebarContent extends React.Component {

  static propTypes = {
    sections: React.PropTypes.array,
    components: React.PropTypes.array,
    componentId: React.PropTypes.string,
    onSelectItem: React.PropTypes.func.isRequired
  }

  isActive = (id) => id === this.props.componentId

  render() {
    const { sections, components, onSelectItem } = this.props;
    const getItems = (sectionId, components) => components.map(c =>
      <Item {...c} onClick={onSelectItem} indent active={this.isActive(c.id)} key={c.id} />
    );

    const getSections = (sections) => sections.map(({ id, components, title }) => [title].concat(getItems(id, components)));

    return (
      <div className='sidebar-content'>
        {sections ? getSections(sections) : getItems(components)}
      </div>
    );
  }

}
