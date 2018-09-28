import * as React from 'react';
import * as cx from 'classnames';
import { props, ReactElement, ReactChild, ReactChildren, ReactNode } from 'tcomb-react';
import * as t from 'tcomb';
import _find = require('lodash/find');

export { props, t, ReactElement, ReactChild, ReactChildren, ReactNode };
export const stateClassUtil = (classes: string[]): string => cx(classes.map(cl => `is-${cl}`));

type Props = {
  context?: { [k: string]: any },
  children: any
};

export const getContextWrapper = (contextTypes = {}): React.ComponentType<Props> => {

  @props({
    context: t.maybe(t.Object),
    children: ReactChildren
  })
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
