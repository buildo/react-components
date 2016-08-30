import React from 'react';
import ReactDOM from 'react-dom';
import _axios from 'axios';
import { RouteHandler } from 'react-router';
import find from 'lodash/find';
import reject from 'lodash/reject';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import partial from 'lodash/partial';
import sortBy from 'lodash/sortBy';
import { props, t } from 'tcomb-react';
import SidebarContent from '../../src/kitchen-sink/sidebar/SidebarContent';
import ReactSidebar from 'react-sidebar';
import * as brc from '../../src';
import { DatePicker, DatePickerInput } from 'rc-datepicker/src';
import InputChildren from 'react-input-children/src';
import TextareaAutosize from 'react-autosize-textarea/src';
import { cookie, default as CookieBanner } from 'react-cookie-banner/src';
import json from 'raw!../components.json';

require('./app.scss');

const scope = {
  React, ReactDOM,
  t,
  log: x => console.log(x), // eslint-disable-line no-console
  find, partial, reject,
  ...brc,
  DatePicker, DatePickerInput,
  InputChildren,
  TextareaAutosize,
  cookie, CookieBanner
};

@props({
  router: t.Function,
  query: t.Object,
  params: t.Object
})
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.rawgit = _axios.create({ baseURL: 'https://rawgit.com/buildo' });
    this.github = _axios.create({ baseURL: 'https://api.github.com/repos/buildo/' });
    this.state = {};
  }

  componentDidMount() {
    this.loadJSON();
  }

  loadJSON = () => {
    if (process.env.NODE_ENV === 'development') {
      const sections = JSON.parse(json);
      this.getLastCommitHash({ data: sections })
        .then(sections => this.setState({ sections }));
    } else {
      this.rawgit.get('react-components/master/showroom/components.json')
        .then(this.getLastCommitHash)
        .then((sections) => this.setState({ sections }));
    }
  }

  getLastCommitHash = (res) => {
    const sections = res.data;
    const items = flatten(sections.map(s => s.components || s.contents));
    const repos = uniq(items, i => i.repo).map(i => i.repo);

    const getHash = (repo) => cookie(repo) || this.github.get(`${repo}/commits/master`);

    return Promise.all(repos.map(getHash))
      .then(res => {
        res.forEach((r, i) => cookie(repos[i]) !== r && cookie(repos[i], r.data.sha, 3600));
        const getSha = r => r.data ? r.data.sha : r;

        return sections.map(s => ({
          ...s,
          components: s.components ? sortBy(s.components, 'title').map(c => ({ ...c, tag: getSha(res[repos.indexOf(c.repo)]) })) : undefined,
          contents: s.contents ? sortBy(s.contents, 'title').map(c => ({ ...c, tag: getSha(res[repos.indexOf(c.repo)]) })) : undefined
        }));
      });
  }

  onSelectItem = (sectionId, id) => {
    const section = find(this.state.sections, { id: sectionId });
    const route = section.components ? 'component' : 'content';
    const param = `${route}Id`;
    this.props.router.transitionToPatch(route, { sectionId, [param]: id });
  }

  onToggleSection = (sectionId) => {
    const { query: { openSections: querySections }, router } = this.props;
    const openSections = (querySections || '').split(';');
    if (openSections.indexOf(sectionId) === -1) {
      router.transitionToPatch(null, null, { openSections: openSections.concat(sectionId).join(';') });
    } else {
      router.transitionToPatch(null, null, { openSections: openSections.filter(s => s !== sectionId).join(';') });
    }
  }

  render() {
    const {
      state: { sections },
      props: { query: { openSections: querySections } },
      onToggleSection, onSelectItem
    } = this;
    if (!sections) {
      return null;
    }

    const openSections = (querySections || '').split(';');

    return (
      <div>
        <div className='kitchen-sink'>
          <div className='sidebar'>
            <ReactSidebar shadow={false} docked sidebar={<SidebarContent {...{ sections, onToggleSection, openSections, onSelectItem }} />} transitions={false}>
              <div />
            </ReactSidebar>
          </div>
        </div>
        <RouteHandler {...{ ...this.props, sections, openSections, onToggleSection, onSelectItem, scope }} />
      </div>
    );
  }

}
