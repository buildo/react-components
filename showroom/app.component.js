import React from 'react';
import ReactDOM from 'react-dom';
import { Route, DefaultRoute, create } from 'react-router';
import patchReactRouter from './patch-react-router';
import App from './components/App';
import IsolatedComponentView from './components/IsolatedComponentView';

import 'buildo-normalize-css';
import './styles.js';

const routes = (
  <Route name='main' path='/' handler={App}>
    <DefaultRoute name='component' handler={IsolatedComponentView} />
  </Route>
);

const router = patchReactRouter(create({ routes }));

router.run((Handler, { params, query }) => {
  // RENDERS
  ReactDOM.render(<Handler {...{ router, params, query }} />, document.getElementById('app'));
});
