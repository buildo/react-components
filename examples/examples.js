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

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openSections: sections.map(s => s.id) };
  }

  onSelectItem = (sectionId, componentId) => {
    this.props.router.transitionTo('/', null, { componentId, sectionId });
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    });
  }

  onToggleSection = (sectionId) => {
    const { openSections } = this.state;
    if (openSections.indexOf(sectionId) !== -1) {
      this.setState({ openSections: openSections.filter(s => s !== sectionId) });
    } else {
      this.setState({ openSections: openSections.concat(sectionId) });
    }
  }

  render() {
    const {
      props: { query: { componentId = defaultComponent, sectionId } },
      state: { openSections, loading },
      onSelectItem, onToggleSection
    } = this;



    return (
      <div style={{ padding: 100 }}>
        <KitchenSink {...{ scope, sections, loading, componentId, sectionId, onSelectItem, onToggleSection, openSections }} />
      </div>
    );
  }
}


const routes = (
  <Route path='/' handler={Examples} />
);

const router = create({ routes });

router.run((Handler, { query }) => {
  // RENDERS
  React.render(<Examples router={router} query={query} />, document.getElementById('container'));
});
