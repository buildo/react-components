import React from 'react';
import ReactDOM from 'react-dom';
import { RouteHandler } from 'react-router';
import find from 'lodash/find';
import reject from 'lodash/reject';
import partial from 'lodash/partial';
import sortBy from 'lodash/sortBy';
import { props, t } from 'tcomb-react';
import FlexView from 'react-flexview';
import * as brc from '../../src';
import json from 'raw!../components.json';
import useLocalComponents from './useLocalComponents';
import useLocalReadmes from './useLocalReadmes';
import faker from 'faker';

import './app.scss';

const scope = {
  React, ReactDOM,
  t,
  log: x => console.log(x), // eslint-disable-line no-console
  find, partial, reject, sortBy,
  faker,
  ...brc,
  FlexView
};

const sections = useLocalReadmes(useLocalComponents(JSON.parse(json)));

@props({
  router: t.Function,
  query: t.Object,
  params: t.Object
})
export default class App extends React.Component {

  onSelectItem = (sectionId, id) => {
    if (sectionId === 'home') this.props.router.transitionToPatch('home');
    else {
      const section = find(sections, { id: sectionId });
      const route = section.components ? 'component' : 'content';
      const param = `${route}Id`;
      this.props.router.transitionToPatch(route, { sectionId, [param]: id });
    }
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
      props: { query: { openSections: querySections } },
      onToggleSection, onSelectItem
    } = this;
    if (!sections) {
      return null;
    }

    const openSections = (querySections || '').split(';');

    return (
      <RouteHandler {...{ ...this.props, sections, openSections, onToggleSection, onSelectItem, scope }} />
    );
  }

}
