import React from 'react/addons';
import * as brc from '../src';
import lodash from 'lodash';
import { find } from 'lodash';
import KitchenSink from '../src/kitchen-sink/KitchenSink';

// EXAMPLES
import DropdownTest from 'raw!./components/Dropdown.example';
// import MenuTest from 'raw!./components/Menu.example'; // not used!
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

const components = [
  {
    example: DropdownTest,
    id: 'Dropdown',
    title: 'Dropdown'
  },
  {
    example: PopoverTest,
    id: 'Popover',
    title: 'Popover'
  },
  {
    example: FlexViewTest,
    id: 'FlexView',
    title: 'FlexView'
  },
  {
    example: ScrollViewTest,
    id: 'ScrollView',
    title: 'ScrollView'
  },
  {
    example: LoadingSpinnerTest,
    id: 'LoadingSpinner',
    title: 'LoadingSpinner'
  },
  {
    example: MobileDetectorTest,
    id: 'MobileDetector',
    title: 'MobileDetector'
  },
  {
    example: LinkStateTest,
    id: 'LinkState',
    title: 'LinkState'
  },
  {
    example: TextOverflowTest,
    id: 'TextOverflow',
    title: 'TextOverflow'
  },
  {
    example: ToasterTest,
    id: 'Toaster',
    title: 'Toaster'
  },
  {
    example: BackgroundDimmerTest,
    id: 'BackgroundDimmer',
    title: 'BackgroundDimmer'
  },
  {
    example: ModalManagerTest,
    id: 'ModalManager',
    title: 'ModalManager'
  }
];

const scope = {
  React,
  ...lodash,
  ...brc
};

const defaultComponent = 'FlexView';

const Examples = React.createClass({

  getInitialState() {
    return {
      componentId: defaultComponent
    };
  },

  onSelectItem(componentId) {
    return this.setState({ componentId });
  },

  render() {
    const {
      state: { componentId },
      onSelectItem
    } = this;
    const codeText = find(components, { id: componentId }).example;
    return (
      <div style={{margin: 20}}>
        <KitchenSink {...{ scope, components, componentId, codeText, onSelectItem }} iso />
      </div>
    );
  }
});


React.render(<Examples />, document.getElementById('container'));
