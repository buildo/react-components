import React from 'react';
import find from 'lodash/find';
import { props, t } from '../utils';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import Component from './content/Component';

export default class KitchenSink extends React.Component {

@props({
  componentId: t.maybe(t.String),
  contentId: t.maybe(t.String),
  sectionId: t.maybe(t.String),
  sections: t.Array,
  openSections: t.maybe(t.Array),
  components: t.maybe(t.Array),
  onSelectItem: t.Function,
  onToggleSection: t.Function,
  scope: t.maybe(t.Object),
  iso: t.maybe(t.Boolean),
  header: t.maybe(t.ReactChildren),
  footer: t.maybe(t.ReactChildren),
  loading: t.maybe(t.Boolean)
})
export default class KitchenSink extends React.Component {

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
