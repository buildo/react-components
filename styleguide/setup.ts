import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import FlexView from "react-flexview";
import * as faker from "faker";
import { find, reject, partial, sortBy } from "lodash";

import "buildo-normalize-css";

// monkey-patch React.PropTypes
(React as any).PropTypes = PropTypes;

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
(global as any).ReactDOM = ReactDOM;
(global as any).PropTypes = PropTypes;
(global as any).FlexView = FlexView;
(global as any).tabloData = tabloData;
(global as any).find = find;
(global as any).partial = partial;
(global as any).reject = reject;
(global as any).sortBy = sortBy;

import "../src/utils/theme/typography.scss";

// components sass
import "../src/Button/button.scss";
import "../src/Divider/divider.scss";
import "../src/Menu/menu.scss";
import "../src/Menu/actionsMenu.scss";
import "../src/Panel/tabbedPanel.scss";
import "../src/MoreOrLess/moreOrLess.scss";
import "../src/LoadingSpinner/loadingSpinner.scss";
import "../src/Dropdown/dropdown.scss";
import "../src/Badge/badge.scss";
import "../src/Toggle/toggle.scss";
import "../src/Tooltip/tooltip.scss";
import "../src/Panel/panel.scss";
import "../src/Panel/tabbedPanel.scss";
import "../src/Meter/meter.scss";
import "../src/Modal/modal.scss";
import "../src/ScrollView/scrollView.scss";
import "../src/Tablo/tablo.scss";
import "../src/AsyncStatusIndicator/asyncStatusIndicator.scss";
import "../src/DatePicker/datePicker.scss";
import "../src/DateField/dateField.scss";
import "../src/Input/input.scss";
import "../src/FormField/formField.scss";
import "../src/Textarea/textarea.scss";
import "../src/Checkbox/checkbox.scss";

// examples sass and resources
import "../src/Modal/examples.scss";
import "../src/MoreOrLess/examples.scss";
import "../src/Panel/examples.scss";
import "../src/NavBar/examples.scss";
import "../src/Menu/examples.scss";
import "../src/Dropdown/examples.scss";
import "../src/Meter/examples.scss";
import "../src/Popover/examples.scss";
import "../src/Popover/examples.scss";
import "../src/BrowserDetector/examples.scss";
import "../src/FormField/examples.scss";

(require as any).context("./assets", false, /\.(png|jpg|gif)$/);
