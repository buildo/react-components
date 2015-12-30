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

const sections = [
  {
    title: 'Section 1',
    id: 'section-1',
    components: [
      {
        examples: [DropdownTest],
        id: 'Dropdown',
        title: 'Dropdown'
      },
      {
        examples: [PopoverTest],
        id: 'Popover',
        title: 'Popover'
      }
    ]
  },
  {
    title: 'Section 2',
    id: 'section-2',
    components: [
      {
        examples: [FlexViewTest],
        id: 'FlexView',
        title: 'FlexView'
      },
      {
        examples: [ScrollViewTest],
        id: 'ScrollView',
        title: 'ScrollView'
      },
      {
        examples: [LoadingSpinnerTest],
        id: 'LoadingSpinner',
        title: 'LoadingSpinner'
      },
      {
        examples: [MobileDetectorTest],
        id: 'MobileDetector',
        title: 'MobileDetector'
      },
      {
        examples: [LinkStateTest],
        id: 'LinkState',
        title: 'LinkState'
      },
      {
        examples: [TextOverflowTest],
        id: 'TextOverflow',
        title: 'TextOverflow'
      },
      {
        examples: [ToasterTest],
        id: 'Toaster',
        title: 'Toaster'
      },
      {
        examples: [BackgroundDimmerTest],
        id: 'BackgroundDimmer',
        title: 'BackgroundDimmer'
      },
      {
        examples: [ModalManagerTest],
        id: 'ModalManager',
        title: 'ModalManager'
      }
    ]
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
    this.setState({ componentId });
  },

  render() {
    const {
      state: { componentId },
      onSelectItem
    } = this;

    return (
      <div style={{margin: 20}}>
        <KitchenSink {...{ scope, sections, componentId, onSelectItem }} iso />
      </div>
    );
  }
});


React.render(<Examples />, document.getElementById('container'));
