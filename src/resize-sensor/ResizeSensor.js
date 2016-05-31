import React from 'react';
import ReactDOM from 'react-dom';
import { props, t, pure } from '../utils';
import _ElementQueries from 'css-element-queries/src/ElementQueries';
import _ResizeSensor from 'css-element-queries/src/ResizeSensor';

@pure
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

  componentDidMount() {
    _ElementQueries.listen();
    this.attachResizeSensor();
  }

  componentDidUpdate() {
    this.attachResizeSensor();
  }

  onResize = () => this.props.onResize()

  render() {
    return this.props.children;
  }
}
