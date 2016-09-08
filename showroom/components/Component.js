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
    const TAG = componentInfo.tag;


    const fetchExamples = examples => {
      const shouldFetchExamples = !examples[0].code;

      if (shouldFetchExamples) {
        return _axios.all(examples.map(e => this.rawgitCDN.get(e.url.replace('__TAG__', TAG))))
          .then(res => res.map(({ data: code }, i) => ({
            ...examples[i],
            code
          })));
      }

      return Promise.resolve(examples);
    };

    const fetchReadme = ({ readme, readmeUrl }) => {
      const shouldFetchReadme = !readme;

      if (shouldFetchReadme) {
        return readmeUrl ?
          this.rawgitCDN.get(readmeUrl.replace('__TAG__', TAG)).then(({ data }) => data) :
          Promise.resolve(null);
      }

      return Promise.resolve(readme);
    };

    fetchReadme(componentInfo)
      .then(readme => ({ ...componentInfo, readme }))
      .then(componentInfo => {
        return fetchExamples(componentInfo.examples)
          .then(examples => ({ ...componentInfo, examples }));
      })
      .then(componentInfo => {
        const { readme, examples } = componentInfo;

        // README
        const splittedMarkdown = readme && readme.split('## Props');
        const header = readme ?
          <Markdown source={splittedMarkdown[0]} options={{ html: true }} /> :
          '';
        const footer = readme ?
          splittedMarkdown[1] && <Markdown source={`### Props\n${splittedMarkdown[1]}`} options={{ html: true }} /> :
          '';

        // EXAMPLES
        const components = section.components.map(c => c.id === componentId ? { ...c, examples } : c);
        const mappedSections = sections.map(s => s.id === section.id ? { ...s, components } : s);

        this.setState({ sections: mappedSections, header, footer, loading: false });
      });
  }

  render() {
    const { sections: mappedSections, header, footer, loading } = this.state;
    const {
      params: { componentId, sectionId },
      openSections, onToggleSection,
      onSelectItem, scope: _scope,
      sections: propSections } = this.props;
    const sections = mappedSections || propSections;
    const scope = componentId !== 'react-flexview' ? _scope : { ..._scope, FlexView: require('gh-deps/node_modules/react-flexview/src').default };
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
