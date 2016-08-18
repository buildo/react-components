import React from 'react';
import _axios from 'axios';
import find from 'lodash/find';
import { props, t } from 'tcomb-react';
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
export default class Content extends React.Component {

  constructor(props) {
    super(props);
    this.rawgitCDN = _axios.create({ baseURL: 'https://cdn.rawgit.com/buildo' });
    this.state = { loading: true };
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = (props = this.props) => {
    const { params: { sectionId, contentId }, section, sections } = props;
    const contentInfo = find(section.contents, { id: contentId });
    this.rawgitCDN.get(contentInfo.content.replace('__TAG__', contentInfo.tag))
      .then(res => {
        const content = res.data;
        const contents = section.contents.map(c => c.id === contentId ? { ...c, content } : c);
        const mappedSections = sections.map(s => s.id === sectionId ? { ...s, contents } : s);
        this.setState({ sections: mappedSections, loading: false });
      });
  }

  render() {
    const { sections: mappedSections = this.props.sections, loading } = this.state;
    const {
      params: { sectionId, contentId },
      onSelectItem,
      openSections, onToggleSection,
      sections: propSections
    } = this.props;
    const sections = mappedSections || propSections;

    return <KitchenSink {...{ sections, openSections, sectionId, onToggleSection, contentId, onSelectItem, loading }} />;
  }

  componentWillReceiveProps(nextProps) {
    const { params: { contentId, sectionId } } = nextProps;
    if (contentId !== this.props.params.contentId || sectionId !== this.props.params.sectionId) {
      // resetState
      this.state = { loading: true };
      this.forceUpdate();

      this.loadContent();
    }
  }

}
