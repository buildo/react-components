import React from 'react/addons';
import { range } from 'lodash';
import Toaster from '../../src/toaster/Toaster';

const errors = [
 { id: 1, msg: 1},
 { id: 2, msg: 2},
 { id: 3, msg: 3},
 { id: 4, msg: 4}
];

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      initialized: false,
      toasts: []
    };
  },

  componentDidMount() {
    this.setState({ initialized: true });
    setInterval(this.addToast, 1000);
  },

  getToastStyle() {
    return {
      backgroundColor: 'yellow',
      height: 50,
      width: 200,
      marginTop: 10,
      marginRight: 20
    };
  },

  addToast() {
    const key = Math.random() + '';
    const toast = <div key={key} style={this.getToastStyle()}>{key}</div>;

    const { toasts } = this.state;
    if (toasts.length > 5) {
      return;
      // toasts.pop();
    }
    this.setState({
      // toasts: [toast].concat(toasts)
      toasts: toasts.concat(toast)
    });
  },

  getTemplate() {

    const toaster = (
      <Toaster attachTo='toaster' className='hello' style={{backgroundColor: 'blue'}} moveTransition={{duration: 1000, ease: 'ease-in-out'}}>
        {this.state.toasts}
      </Toaster>
    );

    return (
      <div>
        {this.state.initialized && toaster}
        <div style={{ width: '100%', height: 500, position: 'relative' }} id='toaster'>
        </div>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
