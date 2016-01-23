import React from 'react';
import ReactSidebar from 'react-sidebar';
import LoadingSpinner from '../../loading-spinner';
import SidebarContent from './SidebarContent';

export default class Sidebar extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    sections: React.PropTypes.array.isRequired,
    openSections: React.PropTypes.array.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func,
    loading: React.PropTypes.bool
  }

  render() {
    const { children, loading, ...props } = this.props;
    const sidebar = <SidebarContent {...props} />;
    return (
      <div className='sidebar'>
        <ReactSidebar shadow={false} docked sidebar={sidebar} transitions={false}>
          {loading ? <LoadingSpinner /> : children}
        </ReactSidebar>
      </div>
    );
  }

}
