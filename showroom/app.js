import React from 'react';
import ReactDOM from 'react-dom';
import { Route, create } from 'react-router';
import patchReactRouter from './patch-react-router';
import App from './components/App';
import Section from './components/Section';
import Content from './components/Content';
import Component from './components/Component';

import 'normalize-css/normalize.css';
import './styles.js';

const routes = (
  <Route path='/' handler={App}>
    <Route path='sections/:sectionId' handler={Section}>
      <Route path='content/:contentId' name='content' handler={Content} />
      <Route path='component/:componentId' name='component' handler={Component} />
    </Route>
  </Route>
);

const router = patchReactRouter(create({ routes }));

router.run((Handler, { params, query }) => {
  // RENDERS
  ReactDOM.render(<Handler {...{ router, params, query }} />, document.getElementById('app'));
});
