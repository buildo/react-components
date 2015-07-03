import React from 'react';
import DropdownTest from './components/Dropdown'
import MenuTest from './components/Menu'
import ModalTest from './components/Modal'

const modules = [
  // DropdownTest,
  // MenuTest
];

const template = (
  <div style={{margin: 20}}>
    {modules.map((Module, i) => <Module key={i} />)}
  </div>
);

React.render(template, document.getElementById('container'));

React.render(<ModalTest />, document.getElementById('modal'));