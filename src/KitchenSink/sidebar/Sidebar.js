import React from 'react';
import View from 'react-flexview';
import { props, t } from '../../utils';
import LoadingSpinner from '../../LoadingSpinner';
import SidebarContent from './SidebarContent';

@props({
  children: t.ReactChildren,
  sections: t.Array,
  openSections: t.Array,
  currentItemId: t.maybe(t.String),
  onSelectItem: t.Function,
  onToggleSection: t.maybe(t.Function),
  loading: t.maybe(t.Boolean)
})
export default class Sidebar extends React.Component {

  getLoadingSpinner = () => {
    return (
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <LoadingSpinner />
      </div>
    );
  };

  render() {
    const { children, loading, ...props } = this.props;
    return (
      <View className='sidebar' grow>
        <SidebarContent {...props} />
        <View grow column>
          {loading ? this.getLoadingSpinner() : children}
        </View>
      </View>
    );
  }

}
