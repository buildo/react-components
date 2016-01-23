import React from 'react';
import LoadingSpinner from '../../loading-spinner';
import ExampleCard from './ExampleCard';

export default class Component extends React.Component {

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    component: React.PropTypes.object
  }

  render() {
    const { scope, component, iso, header, footer } = this.props;
    const { examples } = component || {};
    return (
      <div className='component'>
        <div className='header markdown-body'>
          {header}
        </div>
        <div className='examples'>
          {examples ? examples.map((codeText, key) => <ExampleCard {...{ codeText, iso, scope, key }} />) : <LoadingSpinner />}
        </div>
        <div className='footer markdown-body'>
          {footer}
        </div>
      </div>
    );
  }

}
