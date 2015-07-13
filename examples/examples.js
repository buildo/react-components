import React from 'react';
import DropdownTest from './components/Dropdown'
import MenuTest from './components/Menu'
import ModalTest from './components/Modal'
import PopoverTest from './components/Popover'
import CheckboxTest from './components/Checkbox'

const modules = [
  // DropdownTest,
  // MenuTest,
  // PopoverTest,
  CheckboxTest
];

const template = (
  <div style={{margin: 20}}>
    {modules.map((Module, i) => <Module key={i} />)}
  </div>
);

React.render(template, document.getElementById('container'));

// React.render(<ModalTest />, document.getElementById('modal'));