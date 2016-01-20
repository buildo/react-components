import React from 'react/addons';
import { Route, create } from 'react-router-transition-context';
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

  onSelectItem(componentId) {
    this.props.router.transitionTo('/', null, { componentId });
  },

  render() {
    const {
      props: { query: { componentId = defaultComponent } },
      onSelectItem
    } = this;

    return (
      <div style={{ padding: 100 }}>
        <KitchenSink {...{ scope, sections, componentId, onSelectItem }} />
      </div>
    );
  }
});


const routes = (
  <Route path='/' handler={Examples} />
);

const router = create({ routes });

router.run((Handler, { query }) => {
  // RENDERS
  React.render(<Examples router={router} query={query} />, document.getElementById('container'));
});
