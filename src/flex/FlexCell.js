import React from 'react';
import FlexView from './FlexView';

export default React.createClass({ //eslint-disable-line react/prefer-es6-class

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
