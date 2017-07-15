import React from 'react';
import Modal from './Modal';

export const modalWithContext = contextTypes =>
  class ContextWrapper extends React.Component {
    static contextTypes = contextTypes;

    render() {
      const contextProps = {
        childContextTypes: contextTypes,
        getChildContext: () => this.context
      };
      return <Modal {...this.props} {...contextProps} />;
    }
  };
