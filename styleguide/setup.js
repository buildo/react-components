import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import FlexView from 'react-flexview';
import * as faker from 'faker';
import * as find from 'lodash/find';
import * as reject from 'lodash/reject';
import * as partial from 'lodash/partial';
import * as sortBy from 'lodash/sortBy';

import 'buildo-normalize-css';
import 'react-flexview/src/flexView.scss';

const getRandomRow = () => {
  return {
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    city: faker.address.city(),
    email: faker.internet.email(),
    company: faker.company.companyName()
  };
};

const tabloData = Array.apply(null, Array(1000)).map(getRandomRow);

// available in examples
global.ReactDOM = ReactDOM;
global.PropTypes = PropTypes;
global.FlexView = FlexView;
global.tabloData = tabloData;
global.find = find;
global.partial = partial;
global.reject = reject;
global.sortBy = sortBy;

// components sass
import '../src/Button/button.scss';
import '../src/Divider/divider.scss';
import '../src/DropdownMenu/dropdownMenu.scss';
import '../src/DropdownMenu/menu.scss';
import '../src/Panel/tabbedPanel.scss';
import '../src/CollapsibleSection/collapsibleSection.scss';
import '../src/MoreOrLess/moreOrLess.scss';
import '../src/LoadingSpinner/loadingSpinner.scss';
import '../src/Dropdown/dropdown.scss';
import '../src/ConfirmationInput/confirmationInput.scss';
import '../src/Badge/badge.scss';
import '../src/Toggle/toggle.scss';
import '../src/Tooltip/tooltip.scss';
import '../src/Panel/panel.scss';
import '../src/Panel/tabbedPanel.scss';
import '../src/Meter/meter.scss';
import '../src/Modal/modal.scss';
import '../src/ScrollView/scrollView.scss';
import '../src/Tablo/tablo.scss';
import '../src/AsyncStatusIndicator/asyncStatusIndicator.scss';
import '../src/DatePicker/datePicker.scss';
import '../src/DateField/dateField.scss';


// examples sass and resources
import '../src/Modal/examples.scss';
import '../src/MoreOrLess/examples.scss';
import '../src/Panel/examples.scss';
import '../src/CollapsibleSection/examples.scss';
import '../src/BackgroundDimmer/examples.scss';
import '../src/NavBar/examples.scss';
import '../src/DropdownMenu/examples.scss';
import '../src/Dropdown/examples.scss';
import '../src/Meter/examples.scss';
import '../src/Popover/examples.scss';
import '../src/Popover/examples.scss';
import '../src/BrowserDetector/examples.scss';
