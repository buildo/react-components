import React from 'react';
import Dropdown from './components/Dropdown'
import Menu from './components/Menu'

const modules = [
  // Dropdown,
  Menu
];

const template = (
  <div style={{margin: 20}}>
    {modules.map((Module, i) => <Module key={i} />)}
  </div>
);

React.render(template, document.getElementById('container'));