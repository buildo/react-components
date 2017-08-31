import * as React from 'react';
import * as ReactDOM from 'react-dom';
import _debounce = require('lodash/debounce');
import { props, t, ReactChildren } from '../utils';
import _ResizeSensor = require('css-element-queries/src/ResizeSensor');

export const Props = {
  children: ReactChildren,
  onResize: t.Function,
  debounce: t.maybe(t.Integer)
};

export type ResizeSensorProps = {
  /** content */
  children: JSX.Element,
  /** called when a resize event is captured */
  onResize: () => void,
  /** callback delay (milliseconds) */
  debounce?: number
};

interface ResizeSensorElement extends Element {
  resizedAttached?: {}
};

/**
 * A component used to intercept window resize events
 */
@props(Props)
export default class ResizeSensor extends React.Component<ResizeSensorProps> {

  private elementQueries: boolean
  private resizeSensor: {} | null

  attachResizeSensor = () => {
    const { debounce } = this.props;
    const element = ReactDOM.findDOMNode<ResizeSensorElement>(this);
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

  shouldComponentUpdate({ children, debounce }: ResizeSensorProps) {
    /*
      we don't need to update if `onResize` has changed
      as we're using the constant `this.onResize` callback
    */
    return children !== this.props.children || debounce !== this.props.debounce;
  }
}
