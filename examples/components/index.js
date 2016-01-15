import Dropdown from 'raw!./Dropdown.example';
// import Menu from 'raw!./Menu.example'; // not used!
import Popover from './popover';
import FlexView from './flex';
import ScrollView from './scroll';
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

import '../../src/more-or-less/moreOrLess.scss';
import '../../src/flex/flexView.scss';
import '../../src/loading-spinner/style.scss';
import '../../src/confirmation-input/confirmationInput.scss';
import '../../src/badge/badge.scss';

export default [
  {
    title: 'Revenge',
    id: 'section-1',
    components: [
      {
        examples: Divider,
        id: 'Divider',
        title: 'Divider'
      },
      {
        examples: Icon,
        id: 'Icon',
        title: 'Icon'
      },
      {
        examples: Panel,
        id: 'Panel',
        title: 'Panel'
      },
      {
        examples: [DropdownMenu],
        id: 'DropdownMenu',
        title: 'DropdownMenu'
      },
      {
        examples: [Tooltip],
        id: 'Tooltip',
        title: 'Tooltip'
      },
      {
        examples: [Button],
        id: 'Button',
        title: 'Button'
      },
      {
        examples: [MoreOrLess],
        id: 'MoreOrLess',
        title: 'MoreOrLess'
      },
      {
        examples: [ConfirmationInput],
        id: 'ConfirmationInput',
        title: 'ConfirmationInput'
      },
      {
        examples: [Badge],
        id: 'Badge',
        title: 'Badge'
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
        title: 'NavBar'
      },
      {
        examples: [Dropdown],
        id: 'Dropdown',
        title: 'Dropdown'
      },
      {
        examples: Popover,
        id: 'Popover',
        title: 'Popover'
      },
      {
        examples: FlexView,
        id: 'FlexView',
        title: 'FlexView'
      },
      {
        examples: ScrollView,
        id: 'ScrollView',
        title: 'ScrollView'
      },
      {
        examples: [LoadingSpinner],
        id: 'LoadingSpinner',
        title: 'LoadingSpinner'
      },
      {
        examples: [MobileDetector],
        id: 'MobileDetector',
        title: 'MobileDetector'
      },
      {
        examples: [LinkState],
        id: 'LinkState',
        title: 'LinkState'
      },
      {
        examples: TextOverflow,
        id: 'TextOverflow',
        title: 'TextOverflow'
      },
      {
        examples: Toaster,
        id: 'Toaster',
        title: 'Toaster'
      },
      {
        examples: [BackgroundDimmer],
        id: 'BackgroundDimmer',
        title: 'BackgroundDimmer'
      },
      {
        examples: [ModalManager],
        id: 'ModalManager',
        title: 'ModalManager'
      }
    ]
  }
]
