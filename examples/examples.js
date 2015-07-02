import React from 'react';
import Datepicker from './components/datepicker';
import InputLink from './components/inputLink';
import CookieBanner from './components/cookieBanner';
import TextareaAutosize from './components/autosizeTextarea';

const template = (
  <div className='grid'>
    <h1>Simple exports</h1>
    <div className='row'>
      {InputLink}
      {Datepicker}
      {CookieBanner}
    </div>
    <div className='row'>
      {TextareaAutosize}
    </div>
    <h1>Custom Wrappers</h1>
  </div>
);

React.render(template, document.getElementById('container'));