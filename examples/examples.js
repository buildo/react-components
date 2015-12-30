import React from 'react/addons';
import Playground from 'component-playground';
import * as brc from '../src';
import lodash from 'lodash';

// EXAMPLES
import DropdownTest from 'raw!./components/Dropdown.example';
import MenuTest from 'raw!./components/Menu.example'; // not used!
import PopoverTest from 'raw!./components/Popover.example';
import FlexViewTest from 'raw!./components/FlexView.example';
import ScrollViewTest from 'raw!./components/ScrollView.example';
import LoadingSpinnerTest from 'raw!./components/LoadingSpinner.example';
import MobileDetectorTest from 'raw!./components/MobileDetector.example';
import LinkStateTest from 'raw!./components/LinkState.example';
import TextOverflowTest from 'raw!./components/TextOverflow.example';
import ToasterTest from 'raw!./components/Toaster.example';
import BackgroundDimmerTest from 'raw!./components/BackgroundDimmer.example';
import ModalManagerTest from 'raw!./components/ModalManager.example';

const modules = [
  DropdownTest,
  // PopoverTest,
  // FlexViewTest,
  // ScrollViewTest,
  // LoadingSpinnerTest,
  // MobileDetectorTest,
  // LinkStateTest,
  // TextOverflowTest,
  // ToasterTest,
  // BackgroundDimmerTest,
  // ModalManagerTest
];

const footer = (i) => `\n\nReact.render(<Example${i} />, document.getElementById("content${i}"));`;
const codeText = modules.map((Module, i) => Module.replace('Example', `Example${i}`) + footer(i));

const scope = {
  React,
  ...lodash,
  ...brc
};

const template = (
  <div style={{margin: 20}}>
    <Playground codeText={codeText.join('\n')} scope={scope} es6Console />
    {modules.map((_, i) => <div id={`content${i}`} key={i} />)}
  </div>
);

document.getElementById('iso-container').innerHTML = React.renderToString(template);
React.render(template, document.getElementById('iso-container'));
React.render(template, document.getElementById('container'));
