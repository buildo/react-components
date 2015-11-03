import React from 'react/addons';
import { range, reject } from 'lodash';
import Toaster from '../../src/toaster';
import { TimerToast } from '../../src';


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

  getTransitionStyles() {
    return {
      enter: {
        opacity: '0.2',
        transform: 'translateX(100%)',
        WebkitTransition: 'opacity .8s ease-out, -webkit-transform .8s ease-out',
        transition: 'opacity .8s ease-out, transform .8s ease-out'
      },
      enterActive: {
        opacity: '1',
        transform: 'translateX(0)'
      },
      leave: {
        opacity: '1',
        transform: 'translateX(0)',
        WebkitTransition: 'opacity .8s ease-out, -webkit-transform .8s ease-out',
        transition: 'opacity .8s ease-out, transform .8s ease-out'
      },
      leaveActive: {
        opacity: '0.01',
        transform: 'translateX(100%)'
      },
      default: {
        WebkitTransition: '-webkit-transform 0.3s ease-in-out',
        transition: 'transform 0.3s ease-in-out'
      }
    }
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
    const toasts = this.state.toasts.map(t => t.el);
    const inlineToaster = (
      <Toaster className='hello' style={{backgroundColor: 'blue'}} transitionStyles={this.getTransitionStyles()} transitionEnterTimeout={800} transitionLeaveTimeout={800}>
        {toasts}
      </Toaster>
    );

    const attachedToaster = (
      <Toaster attachTo='toaster' className='hello' style={{backgroundColor: 'blue'}} transitionStyles={this.getTransitionStyles()} transitionEnterTimeout={800} transitionLeaveTimeout={800}>
        {toasts}
      </Toaster>
    );

    return (
      <div>
        <div style={{ width: '100%', height: 350, position: 'relative' }}>
          {inlineToaster}
        </div>
        {this.state.initialized && attachedToaster}
        <div style={{ width: '100%', height: 350, position: 'relative' }} id='toaster' />
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
