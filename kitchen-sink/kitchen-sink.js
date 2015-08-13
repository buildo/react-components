import React from 'react';
// CARDS
import Datepicker from './components/datepicker';
import InputLink from './components/inputLink';
import CookieBanner from './components/cookieBanner';
import TextareaAutosize from './components/autosizeTextarea';
import Flex from './components/flex';
import LoadingSpinner from './components/loadingSpinner';
// COMPONENTS
import DropdownLive from '../src/dropdown'
import LoadingSpinnerLive from '../src/loading-spinner'

const template = (
  <div className='grid'>
    <div className='row'>
      {InputLink}
      {Datepicker}
      {CookieBanner}
    </div>
    <div className='row'>
      {TextareaAutosize}
      {Flex}
      {LoadingSpinner}
    </div>
    <h1>Live demos</h1>
    <h3>Dropdown</h3>
    <DropdownLive
      searchable={false}>
      <p>one</p>
      <p>deux</p>
      <p>tres</p>
      <p>quattro</p>
    </DropdownLive>
    <h3>LoadingSpinner</h3>
    <div style={{position: 'relative', height: 80}}>
      <LoadingSpinnerLive />
    </div>
  </div>
);

React.render(template, document.getElementById('container'));