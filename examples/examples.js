import React from 'react';
import DropdownTest from './components/Dropdown';
import MenuTest from './components/Menu';
import ModalTest from './components/Modal';
import PopoverTest from './components/Popover';
import FlexViewTest from './components/FlexView';
import ScrollViewTest from './components/ScrollView';
import LoadingSpinnerTest from './components/LoadingSpinner';
import MobileDetectorTest from './components/MobileDetector';
import LinkStateTest from './components/LinkState';
import TextOverflowTest from './components/TextOverflow';
import ToasterTest from './components/Toaster';
import BackgroundDimmerTest from './components/BackgroundDimmer';
import ModalManagerTest from './components/ModalManager';

const modules = [
  // DropdownTest,
  // MenuTest,
  // PopoverTest,
  // FlexViewTest,
  // ScrollViewTest,
  // LoadingSpinnerTest,
  // MobileDetectorTest,
  // LinkStateTest,
  // TextOverflowTest,
  // ToasterTest,
  BackgroundDimmerTest,
  ModalManagerTest
];

const template = (
  <div style={{margin: 20}}>
    {modules.map((Module, i) => <Module key={i} />)}
  </div>
);

document.getElementById('iso-container').innerHTML = React.renderToString(template);
React.render(template, document.getElementById('iso-container'));
React.render(template, document.getElementById('container'));

// React.render(<ModalTest />, document.getElementById('modal'));