import React from 'react';
import cx from '../utils/classnames';
import { props, t } from 'tcomb-react';

import skinnable from 'react-skinnable';
export { skinnable };
export { contains } from 'react-skinnable';
export { props, t };
export const stateClassUtil = (...classes) => cx([].concat(...classes).map(cl => `is-${cl}`));

export const getContextWrapper = (contextTypes = {}) => {

  @props({
    context: t.maybe(t.Object),
    children: t.ReactChildren
  })
  class ContextWrapper extends React.Component {

    static childContextTypes = contextTypes;

    getChildContext = () => this.props.context || {};

    render() {
      return this.props.children;
    }
  }

  return ContextWrapper;
};