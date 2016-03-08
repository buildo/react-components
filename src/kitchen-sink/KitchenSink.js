import React from 'react';
import find from 'lodash/find';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import Component from './content/Component';

export default class KitchenSink extends React.Component {

  static propTypes = {
    componentId: React.PropTypes.string,
    contentId: React.PropTypes.string,
    sectionId: React.PropTypes.string,
    sections: React.PropTypes.array.isRequired,
    openSections: React.PropTypes.array,
    components: React.PropTypes.array,
    onSelectItem: React.PropTypes.func.isRequired,
    onToggleSection: React.PropTypes.func.isRequired,
    scope: React.PropTypes.object,
    iso: React.PropTypes.bool,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    loading: React.PropTypes.bool
  };

  static defaultProps = {
    openSections: []
  };

  findSection = () => find(this.props.sections, { id: this.props.sectionId }) || {};

  findComponent = () => find(this.findSection().components, { id: this.props.componentId });

  findContent = () => find(this.findSection().contents, { id: this.props.contentId });

  getChildren = () => {
    const {
      componentId,
      contentId,
      scope,
      iso,
      header,
      footer
    } = this.props;
    if (componentId) {
      return <Component {...{ component: this.findComponent(), scope, iso, header, footer }} />;
    } else if (contentId) {
      return <Content content={this.findContent()} />;
    }
    return <div />;
  };

  render() {
    const {
      props: {
        componentId,
        contentId,
        sections,
        openSections,
        onSelectItem,
        onToggleSection,
        loading
      }
    } = this;

    return (
      <div className='kitchen-sink'>
        <Sidebar {...{ sections, openSections, onToggleSection, componentId, contentId, onSelectItem, loading }} >
          {!loading && this.getChildren()}
        </Sidebar>
      </div>
    );
  }

}
