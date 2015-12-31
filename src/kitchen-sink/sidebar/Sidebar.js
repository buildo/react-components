import React from 'react';
import ReactSidebar from 'react-sidebar';
import SidebarContent from './SidebarContent';

export default class Sidebar extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    sections: React.PropTypes.array,
    components: React.PropTypes.array,
    componentId: React.PropTypes.string,
    onSelectItem: React.PropTypes.func.isRequired
  }

  render() {
    const { children, ...props } = this.props;
    const sidebar = <SidebarContent {...props} />;
    return (
      <div className='sidebar'>
        <ReactSidebar docked sidebar={sidebar}>
          {children}
        </ReactSidebar>
      </div>
    );
  }

}
