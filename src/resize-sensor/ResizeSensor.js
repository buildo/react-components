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
    this.resizeSensor = new _ResizeSensor(
      ReactDOM.findDOMNode(this),
      this.onResize
    );
  }

  detachResizeSensor = () => {
    this.resizeSensor.detach(ReactDOM.findDOMNode(this));
  }

  updateResizeSensor = () => {
    if (this.resizeSensor) {
      this.detachResizeSensor();
    }
    this.attachResizeSensor();
  }

  componentDidMount() {
    _ElementQueries.listen();
    this.updateResizeSensor();
  }

  componentDidUpdate() {
    this.updateResizeSensor();
  }

  componentWillUnmount() {
    this.detachResizeSensor();
    this.resizeSensor = null;
  }

  onResize = () => this.props.onResize()

  render() {
    return this.props.children;
  }
}
