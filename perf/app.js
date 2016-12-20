import React from 'react';
import ReactDOM from 'react-dom';

import Test from './tests';

import 'buildo-normalize-css';

ReactDOM.render((
  <div>
    <h1>ENV: {process.env.NODE_ENV}</h1>
    <Test />
  </div>
), document.getElementById('app'));
