import * as React from 'react';
import cx from '../utils/classnames';
import { props, t } from 'tcomb-react';

import skinnable from 'react-skinnable';
export { skinnable };
export { contains } from 'react-skinnable';
export { props, t };
export const stateClassUtil = (...classes: string[]): string => cx(classes.map(cl => `is-${cl}`));

type Props = {
  context?: { [k: string]: any },
  children: any
};

export const getContextWrapper = (contextTypes = {}): React.ComponentType<Props> => {

  @props({
    context: t.maybe(t.Object),
    children: t.ReactChildren
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
