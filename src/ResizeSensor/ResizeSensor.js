import React from 'react';
import ReactDOM from 'react-dom';
import _debounce from 'lodash.debounce';
import { props, t } from '../utils';
import _ResizeSensor from 'css-element-queries/src/ResizeSensor';

export const Props = {
  children: t.ReactChildren,
  onResize: t.Function,
  debounce: t.maybe(t.Integer)
};

/**
 * A component used to intercept window resize events
 * @param children - content
 * @param onResize - called when a resize event is captured
 * @param debounce - callback delay (milliseconds)
 */
@props(Props)
export default class ResizeSensor extends React.Component {

  attachResizeSensor = () => {
    const { debounce } = this.props;
    const element = ReactDOM.findDOMNode(this);
    if (!element.resizedAttached) {
      this.resizeSensor = new _ResizeSensor(element, debounce ? _debounce(this.onResize, debounce) : this.onResize);
    }
  }

  initElementQueries = () => {
    if (!this.elementQueries) {
      require('css-element-queries/src/ElementQueries').listen();
      this.elementQueries = true;
    }
  }

  updateSensorAndQueries = () => {
    if (typeof window !== 'undefined') {
      this.initElementQueries();
      this.attachResizeSensor();
    }
  }

  componentDidMount() {
    this.updateSensorAndQueries();
  }

  componentDidUpdate() {
    this.updateSensorAndQueries();
  }

  componentWillUnmount() {
    this.resizeSensor = null;
  }

  onResize = () => !!this.resizeSensor && this.props.onResize()

  render() {
    return this.props.children;
  }

  shouldComponentUpdate({ children, debounce }) {
    /*
      we don't need to update if `onResize` has changed
      as we're using the constant `this.onResize` callback
    */
    return children !== this.props.children || debounce !== this.props.debounce;
  }
}
