import React from 'react';
import Item from './Item';

export default class SidebarContent extends React.Component {

  static propTypes = {
    components: React.PropTypes.array.isRequired,
    componentId: React.PropTypes.string,
    onSelectItem: React.PropTypes.func.isRequired
  }

  isActive = (id) => id === this.props.componentId

  render() {
    const { components, onSelectItem } = this.props;
    return (
      <div className='sidebar-content'>
        {components.map(c => <Item {...c} onClick={onSelectItem} active={this.isActive(c.id)} key={c.id} />)}
      </div>
    );
  }

}
