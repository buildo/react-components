import React from 'react/addons';
import * as brc from '../src';
import lodash from 'lodash';
import KitchenSink from '../src/kitchen-sink/KitchenSink';
import sections from './components';

import '../src/more-or-less/moreOrLess.scss';
import '../src/flex/flexView.scss';
import '../src/loading-spinner/style.scss';
import '../src/kitchen-sink/style.scss';

const scope = {
  React,
  ...lodash,
  ...brc
};

const defaultComponent = 'ConfirmationInput';

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
      <div>
        <KitchenSink {...{ scope, sections, componentId, onSelectItem }} />
      </div>
    );
  }
});


React.render(<Examples />, document.getElementById('container'));
