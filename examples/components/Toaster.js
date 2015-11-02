import React from 'react/addons';
import { range, reject } from 'lodash';
import Toaster from '../../src/toaster/Toaster';
import TimerToast from '../../src/toaster/TimerToast';

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

  onTimeOut(key) {
    this.setState({
      toasts: reject(this.state.toasts, { key })
    });
  },

  addToast() {
    const key = Math.random() + '';
    const toast = {
      key,
      el :<TimerToast onTimeOut={this.onTimeOut} duration={5000} key={key}><div style={this.getToastStyle()}>{key}</div></TimerToast>
    };

    const { toasts } = this.state;
    if (toasts.length > 5) {
      return;
      // toasts.pop();
    }
    this.setState({
      toasts: [toast].concat(toasts)
      // toasts: toasts.concat(toast)
    });
  },

  getTemplate() {

    const toaster = (
      <Toaster attachTo='toaster' className='hello' style={{backgroundColor: 'blue'}} transitionGroup={{ transitionName: 'toaster-anim' }}>
        {this.state.toasts.map(t => t.el)}
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
