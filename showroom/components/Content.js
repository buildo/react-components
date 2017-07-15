import React from 'react';
import { props, t } from 'tcomb-react';
import KitchenSink from '../../src/KitchenSink';

@props({
  router: t.Function,
  query: t.Object,
  params: t.Object,
  sections: t.Array,
  openSections: t.Array,
  section: t.Object,
  onToggleSection: t.Function,
  scope: t.Object,
  onSelectItem: t.Function
})
export default class Content extends React.Component {

  render() {
    const {
      onSelectItem,
      openSections, onToggleSection,
      sections,
      params: { sectionId, contentId }
    } = this.props;

    return <KitchenSink {...{ sections, openSections, sectionId, onToggleSection, contentId, onSelectItem }} />;
  }

}
