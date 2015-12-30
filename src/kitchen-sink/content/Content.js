import React from 'react';
import LoadingSpinner from '../../loading-spinner';
import ExampleCard from './ExampleCard';

export default class Content extends React.Component {

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    component: React.PropTypes.object
  }

  render() {
    const { scope, component, iso } = this.props;
    const { examples, title } = component || {};
    return (
      <div className='content'>
        <h1>{title}</h1>
        {examples ? examples.map(codeText => <ExampleCard {...{ codeText, iso, scope }} />) : <LoadingSpinner />}
      </div>
    );
  }

}
