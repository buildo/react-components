import React from 'react';
import { props, t } from 'tcomb-react';
import find from 'lodash/find';
import Markdown from 'react-remarkable';
import KitchenSink from '../../src/kitchen-sink';


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
export default class Component extends React.Component {

  getPatchedScope = (scope, componentId) => ({
    ...scope,
    FlexView: componentId === 'react-flexview' ? require('gh-deps/node_modules/react-flexview/src').default : scope.FlexView,
    InputChildren: componentId === 'react-input-children' ? require('gh-deps/node_modules/react-input-children/src').default : scope.InputChildren,
    TextareaAutosize: componentId === 'react-autosize-textarea' ? require('react-autosize-textarea/src').default : scope.TextareaAutosize,
    CookieBanner: componentId === 'react-cookie-banner' ? require('react-cookie-banner/src').default : scope.CookieBanner,
    cookie: componentId === 'react-cookie-banner' ? require('react-cookie-banner/src').cookie : scope.cookie
  })

  splitMarkdown = readme => {
    const splittedMarkdown = readme && readme.split('## Props');
    return {
      header: readme ? <Markdown source={splittedMarkdown[0]} options={{ html: true }} /> : '',
      footer: readme ? splittedMarkdown[1] && <Markdown source={`### Props\n${splittedMarkdown[1]}`} options={{ html: true }} /> : ''
    };
  }

  render() {
    const {
      getPatchedScope,
      splitMarkdown,
      props: {
        openSections, onToggleSection,
        onSelectItem, scope, section, sections,
        params: { componentId, sectionId }
      }
    } = this;

    const { readme } = find(section.components, { id: componentId });
    const { header, footer } = splitMarkdown(readme);

    const props = {
      openSections, sectionId, componentId, sections,
      onToggleSection, onSelectItem, header, footer,
      scope: getPatchedScope(scope, componentId)
    };

    return <KitchenSink {...props} />;
  }

}
