import React from 'react';
import ReactDOM from 'react-dom';

import Test from './tests/experiment';

import 'buildo-normalize-css';
import '../src/tablo/tablo.scss';
import './tests/blindTest.scss';

ReactDOM.render((
  <div>
    <h1>ENV: {process.env.NODE_ENV}</h1>
    <Test />
  </div>
), document.getElementById('app'));
