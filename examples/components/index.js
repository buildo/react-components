import Dropdown from 'raw!./Dropdown.example';
// import Menu from 'raw!./Menu.example'; // not used!
import Popover from './popover';
import FlexView from './flex';
import ScrollView from './scroll';
import Meter from './meter';
import LoadingSpinner from 'raw!./LoadingSpinner.example';
import MobileDetector from 'raw!./MobileDetector.example';
import LinkState from 'raw!./LinkState.example';
import TextOverflow from './text-overflow';
import Toaster from './toaster';
import BackgroundDimmer from 'raw!./BackgroundDimmer.example';
import ModalManager from 'raw!./ModalManager.example';
import Divider from './Divider';
import Icon from './Icon';
import Panel from './Panel';
import DropdownMenu from 'raw!./DropdownMenu/default.example';
import Tooltip from 'raw!./Tooltip/default.example';
import Button from 'raw!./button/default.example';
import MoreOrLess from 'raw!./more-or-less/default.example';
import ConfirmationInput from 'raw!./confirmation-input/default.example';
import Badge from 'raw!./badge/default.example';
import NavBar from 'raw!./nav-bar/default.example';
import Toggle from 'raw!./toggle/default.example';
import Table from 'raw!./table/default.example';

import README from 'raw!../../README.md';

import '../../src/more-or-less/moreOrLess.scss';
import '../../src/flex/flexView.scss';
import '../../src/loading-spinner/style.scss';
import '../../src/confirmation-input/confirmationInput.scss';
import '../../src/badge/badge.scss';
import '../../src/toggle/toggle.scss';
import '../../src/table/table.scss';
import '../../node_modules/react-select/dist/default.css';

export default [
  {
    title: 'Revenge',
    id: 'section-1',
    components: [
      {
        examples: Divider,
        id: 'Divider',
        title: 'Divider',
        'component': 'react-components/master/src/Divider/Divider.js'
      },
      {
        examples: Icon,
        id: 'Icon',
        title: 'Icon',
        'component': 'react-components/master/src/Icon/Icon.js'
      },
      {
        examples: Panel,
        id: 'Panel',
        title: 'Panel',
        'component': 'react-components/master/src/Panel/Panel.js'
      },
      {
        examples: [DropdownMenu],
        id: 'DropdownMenu',
        title: 'DropdownMenu',
        'component': 'react-components/master/src/DropdownMenu/DropdownMenu.js'
      },
      {
        examples: [Tooltip],
        id: 'Tooltip',
        title: 'Tooltip',
        'component': 'react-components/master/src/Tooltip/Tooltip.js'
      },
      {
        examples: [Button],
        id: 'Button',
        title: 'Button',
        'component': 'react-components/master/src/Button/Button.js'
      },
      {
        examples: [MoreOrLess],
        id: 'MoreOrLess',
        title: 'MoreOrLess',
        'component': 'react-components/master/src/more-or-less/MoreOrLess.js'
      },
      {
        examples: [ConfirmationInput],
        id: 'ConfirmationInput',
        title: 'ConfirmationInput',
        'component': 'react-components/master/src/confirmation-input/ConfirmationInput.js'
      },
      {
        examples: [Badge],
        id: 'Badge',
        title: 'Badge',
        'component': 'react-components/master/src/badge/Badge.js'
      },
      {
        examples: [Toggle],
        id: 'Toggle',
        title: 'Toggle',
        'component': 'react-components/master/src/toggle/Toggle.js'
      },
      {
        examples: [Table],
        id: 'Table',
        title: 'Table',
        component: 'react-components/master/src/table/Table.js'
      }
    ]
  },
  {
    title: 'Buildo',
    id: 'section-2',
    components: [
      {
        examples: [NavBar],
        id: 'NavBar',
        title: 'NavBar',
        'component': 'react-components/master/src/nav-bar/NavBar.js'
      },
      {
        examples: [Dropdown],
        id: 'Dropdown',
        title: 'Dropdown',
        'component': 'react-components/master/src/dropdown/Dropdown.js'
      },
      {
        examples: Popover,
        id: 'Popover',
        title: 'Popover',
        'component': 'react-components/master/src/popover/Popover.js'
      },
      {
        examples: FlexView,
        id: 'FlexView',
        title: 'FlexView',
        'component': 'react-components/master/src/flex/FlexView.js'
      },
      {
        examples: ScrollView,
        id: 'ScrollView',
        title: 'ScrollView',
        'component': 'react-components/master/src/scroll/ScrollView.js'
      },
      {
        examples: Meter,
        id: 'Meter',
        title: 'Meter',
        'component': 'react-components/master/src/meter/Meter.js'
      },
      {
        examples: [LoadingSpinner],
        id: 'LoadingSpinner',
        title: 'LoadingSpinner',
        'component': 'react-components/master/src/loading-spinner/LoadingSpinner.js'
      },
      {
        examples: [MobileDetector],
        id: 'MobileDetector',
        title: 'MobileDetector',
        'component': 'react-components/master/src/mobile-detector/MobileDetector.js'
      },
      {
        examples: [LinkState],
        id: 'LinkState',
        title: 'LinkState',
        'component': 'react-components/master/src/link-state/LinkState.js'
      },
      {
        examples: TextOverflow,
        id: 'TextOverflow',
        title: 'TextOverflow',
        'component': 'react-components/master/src/text-overflow/TextOverflow.js'
      },
      {
        examples: Toaster,
        id: 'Toaster',
        title: 'Toaster',
        'component': 'react-components/master/src/toaster/Toaster.js'
      },
      {
        examples: [BackgroundDimmer],
        id: 'BackgroundDimmer',
        title: 'BackgroundDimmer',
        'component': 'react-components/master/src/background-dimmer/BackgroundDimmer.js'
      },
      {
        examples: [ModalManager],
        id: 'ModalManager',
        title: 'ModalManager',
        'component': 'react-components/master/src/modal-manager/ModalManager.js'
      }
    ]
  },
  {
    title: 'Markdown',
    id: 'markdown',
    contents: [
      {
        id: 'readme',
        title: 'README.md',
        repo: 'react-components',
        content: README
      }
    ]
  }
];
