import * as React from "react";
import _debounce = require("lodash/debounce");
import { props, t, ReactChildren } from "../utils";
import _ResizeSensor = require("css-element-queries/src/ResizeSensor");
import { findDOMNode } from "../utils";

export const Props = {
  children: ReactChildren,
  onResize: t.Function,
  debounce: t.maybe(t.Integer)
};

export namespace ResizeSensor {
  export type Props = {
    /** content */
    children: JSX.Element;
    /** called when a resize event is captured */
    onResize: () => void;
    /** callback delay (milliseconds) */
    debounce?: number;
  };
}

interface ResizeSensorElement extends Element {
  resizedAttached?: {};
}

/**
 * A component that exposes an `onResize` callback called whenever his parent's size changes.
 */
@props(Props)
export class ResizeSensor extends React.Component<ResizeSensor.Props> {
  private elementQueries: boolean;
  private resizeSensor: {} | null;

  attachResizeSensor = () => {
    const { debounce } = this.props;
    const element = findDOMNode<ResizeSensorElement>(this);
    if (!element.resizedAttached) {
      this.resizeSensor = new _ResizeSensor(
        element,
        debounce ? _debounce(this.onResize, debounce) : this.onResize
      );
    }
  };

  initElementQueries = () => {
    if (!this.elementQueries) {
      require("css-element-queries/src/ElementQueries").listen();
      this.elementQueries = true;
    }
  };

  updateSensorAndQueries = () => {
    if (typeof window !== "undefined") {
      this.initElementQueries();
      this.attachResizeSensor();
    }
  };

  componentDidMount() {
    this.updateSensorAndQueries();
  }

  componentDidUpdate() {
    this.updateSensorAndQueries();
  }

  componentWillUnmount() {
    this.resizeSensor = null;
  }

  onResize = () => !!this.resizeSensor && this.props.onResize();

  render() {
    return this.props.children;
  }

  shouldComponentUpdate({ children, debounce }: ResizeSensor.Props) {
    /*
      we don't need to update if `onResize` has changed
      as we're using the constant `this.onResize` callback
    */
    return children !== this.props.children || debounce !== this.props.debounce;
  }
}
