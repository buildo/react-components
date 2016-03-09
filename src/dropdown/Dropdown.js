import React from 'react';
import Select from 'react-select';
import omit from 'lodash/omit';
import cx from 'classnames';
import { props, t } from '../utils';
import { warn } from '../utils/log';

const themes = {
  semantic: 'semantic-theme'
};

const PropTypes = {
  children: t.maybe(t.ReactNode),
  theme: t.maybe(t.enums.of(['semantic'])),
  valueLink: t.maybe(t.struct({
    value: t.maybe(t.String),
    requestChange: t.Function
  }))
};
@props(PropTypes, { strict: false })
export default class Dropdown extends React.Component {

  componentDidMount() {
    this.logWarnings();
  }

  getGeneralProps = () => omit(this.props, Object.keys(PropTypes));

  logWarnings = () => {
    if (this.props.children) {
      warn('You\'re passing children. Not expected behaviour');
    }
  };

  getValueLinkProps = () => {
    if (this.props.valueLink) {
      return {
        value: this.props.valueLink.value,
        onChange: this.props.valueLink.requestChange
      };
    }
  };

  getClassName = () => cx(this.props.className, themes[this.props.theme]);

  render() {
    // The order is important: props may override previous ones
    return (
      <Select
        {...this.getGeneralProps()}
        {...this.getValueLinkProps()}
        {...this.getClassName()}
      />
    );
  }

}
