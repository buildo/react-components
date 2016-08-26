import React from 'react';
import find from 'lodash/find';
import { props, t } from '../utils';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import Component from './content/Component';

/** React component to generate a nice kitchen-sink
 * @param componentId - selected component page
 * @param contentId - selected content page
 * @param sectionId - selected section in sidebar
 * @param sections - list of sidebar sections,
 * @param openSections - list of expanded sections in sidebar
 * @param components - list of components pages
 * @param onSelectItem - called when user selects an item
 * @param onToggleSection - called when user click on a section
 * @param scope - object with variables needed in the components examples
 * @param iso - wheter the kitchen-sink render examples in a fake isomorphic environment
 * @param header - renderable node used as header in component page
 * @param footer - renderable node used as footer in component page
 * @param loading - wheter it's loading or not
 */

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
        sections,
        openSections,
        onSelectItem,
        onToggleSection,
        contentId,
        componentId,
        loading
      }
    } = this;

    const currentItemId = contentId || componentId;

    return (
      <div className='kitchen-sink'>
        <Sidebar {...{ sections, openSections, currentItemId, onToggleSection, onSelectItem, loading }} >
          {!loading && this.getChildren()}
        </Sidebar>
      </div>
    );
  }

}
