import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import _find = require('lodash/find');

export const stateClassUtil = (classes: string[]): string => cx(classes.map(cl => `is-${cl}`));

type Props = {
  context?: { [k: string]: any };
  children: any;
};

export const getContextWrapper = (contextTypes = {}): React.ComponentType<Props> => {
  class ContextWrapper extends React.Component<Props> {
    static childContextTypes = contextTypes;

    getChildContext = () => this.props.context || {};

    render() {
      return this.props.children;
    }
  }

  return ContextWrapper;
};

export type ObjectOmit<O, K extends string> = Pick<O, Exclude<keyof O, K>>;

export type ObjectOverwrite<O1, O2> = Pick<O1, Exclude<keyof O1, keyof O2>> & O2;

export function find<T>(list: Array<T> | undefined, fn: (el: T) => boolean): T | undefined {
  return _find(list, fn);
}

export const findDOMNode = <E extends Element = Element>(ref: React.ReactInstance): E =>
  ReactDOM.findDOMNode(ref) as E;

type ReactText = string | number;
type _ReactChild = React.ReactElement<unknown> | ReactText;

export interface ChildrenArray extends Array<Children> {}
export type ReactFragment = ChildrenArray;
export type Children = _ReactChild | ReactFragment | boolean | null | undefined;
