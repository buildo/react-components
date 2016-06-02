import React from 'react';
import ReactDOM from 'react-dom';
import { props, t } from '../utils';
import _ResizeSensor from 'css-element-queries/src/ResizeSensor';

@props({
  children: t.ReactChildren,
  onResize: t.Function
})
export default class ResizeSensor extends React.Component {

  attachResizeSensor = () => {
    const element = ReactDOM.findDOMNode(this);
    if (!element.resizedAttached) {
      this.resizeSensor = new _ResizeSensor(element, this.onResize);
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

  shouldComponentUpdate(nextProps) {
    /*
      we don't need to update if `onResize` has changed
      as we're using the constant `this.onResize` callback
    */
    return nextProps.children !== this.props.children;
  }
}
