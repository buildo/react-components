import React from 'react';
import FlexView from './FlexView';

export default React.createClass({ //eslint-disable-line

  getDefaultProps() {
    return {
      className: '',
      grow: true
    };
  },

  render() {
    return <FlexView {...this.props} className={`react-flex-cell ${this.props.className}`}/>;
  }

});
