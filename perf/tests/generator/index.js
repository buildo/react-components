import React from 'react';
import t from 'tcomb';
import Perf from 'react-addons-perf';

import range from 'lodash/range';

window.Perf = Perf;

Perf.t = (seconds = 3) => {
  Perf.start();
  setTimeout(() => {
    Perf.stop();
    Perf.printInclusive();
  }, seconds * 1000);
};

export default function({
  NUMBER_OF_TRIALS = 10,
  INTERVAL = 1000,
  Components = [],
  props = range(NUMBER_OF_TRIALS).map(() => ({}))
}) {
  return class Component extends React.Component {

    state = {
      trialIndex: 0,
      componentIndex: 0,
      props: t.Object.is(props) ? range(NUMBER_OF_TRIALS).map(() => props) : props
    }

    startPerf = () => {
      Perf.start();
    }

    stopPerf = () => {
      Perf.stop();
      console.log({ COMPONENT: Components[this.state.componentIndex].name }); //eslint-disable-line no-console
      Perf.printWasted();
      return Perf.getWasted();
    }

    testComponents = () => {
      this.startPerf();
      this.interval = setInterval(() => {
        if (this.state.trialIndex < NUMBER_OF_TRIALS - 1) {
          this.setState({ trialIndex: this.state.trialIndex + 1 });
        } else {
          const op = this.stopPerf();
          console.log('ehiehi', op);
          if (this.state.componentIndex < Components.length - 1) {
            this.setState({ componentIndex: this.state.componentIndex + 1, trialIndex: 0 });
            this.startPerf();
          } else {
            clearInterval(this.interval);
          }
        }
      }, INTERVAL);
    }

    componentDidMount() {
      this.testComponents();
    }

    render() {

      const Component = Components[this.state.componentIndex];
      const props = this.state.props[this.state.trialIndex];

      return (
        <Component {...props} />
      );
    }
  };
}
