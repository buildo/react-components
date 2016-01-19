import React from 'react/addons';
import * as brc from '../src';
import lodash from 'lodash';
import KitchenSink from '../src/kitchen-sink/KitchenSink';
import sections from './components';

import '../src/kitchen-sink/style.scss';

const scope = {
  React,
  ...lodash,
  ...brc
};

const defaultComponent = 'Toggle';

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
      <div style={{ padding: 100 }}>
        <KitchenSink {...{ scope, sections, componentId, onSelectItem }} />
      </div>
    );
  }
});


React.render(<Examples />, document.getElementById('container'));
