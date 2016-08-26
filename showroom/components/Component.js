import React from 'react';
import _axios from 'axios';
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

  constructor(props) {
    super(props);
    this.rawgitCDN = _axios.create({ baseURL: 'https://cdn.rawgit.com/buildo' });
    this.state = { loading: true };
  }

  componentDidMount() {
    this.loadComponent();
  }

  loadComponent = (props = this.props) => {
    const { params: { componentId }, sections, section } = props;

    const componentInfo = find(section.components, { id: componentId });
    const examplesLinks = componentInfo.examples.map(e => this.rawgitCDN.get(e.url.replace('__TAG__', componentInfo.tag)));
    if (componentInfo.readme) {
      const readmeLink = this.rawgitCDN.get(componentInfo.readme.replace('__TAG__', componentInfo.tag));
      _axios.all([readmeLink].concat(examplesLinks))
        .then(res => {
          const markdown = res[0].data;
          const splittedMarkdown = markdown.split('## Props');
          const header = <Markdown source={splittedMarkdown[0]} options={{ html: true }}/>;
          const footer = splittedMarkdown[1] && <Markdown source={`### Props\n${splittedMarkdown[1]}`} options={{ html: true }}/>;
          const examples = res.slice(1).map((r, key) => {
            return {
              code: r.data,
              description: componentInfo.examples[key].description
            };
          });
          const components = section.components.map(c => c.id === componentId ? { ...c, examples } : c);
          const mappedSections = sections.map(s => s.id === section.id ? { ...s, components } : s);
          this.setState({ sections: mappedSections, header, footer, loading: false });
        });
    } else {
      _axios.all(examplesLinks)
        .then(res => {
          const examples = res.map(r => r.data);
          const components = section.components.map(c => c.id === componentId ? { ...c, examples } : c);
          const mappedSections = sections.map(s => s.id === section.id ? { ...s, components } : s);
          this.setState({ sections: mappedSections, header: '', footer: '', loading: false });
        });
    }
  }

  render() {
    const { sections: mappedSections, header, footer, loading } = this.state;
    const {
      params: { componentId, sectionId },
      openSections, onToggleSection,
      onSelectItem, scope,
      sections: propSections } = this.props;
    const sections = mappedSections || propSections;
    const props = { sections, openSections, sectionId, componentId, onToggleSection, onSelectItem, scope, header, footer, loading };

    return <KitchenSink {...props} />;
  }

  componentWillReceiveProps(nextProps) {
    const { params: { componentId, sectionId } } = nextProps;
    if (componentId !== this.props.params.componentId || sectionId !== this.props.params.sectionId) {
      // resetState
      this.state = { loading: true };
      this.forceUpdate();

      this.loadComponent(nextProps);
    }
  }

}
