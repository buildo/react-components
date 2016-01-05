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
    const { examples, title, desc } = component || {};
    return (
      <div className='content'>
        <div className='header'>
          <h1>{title}</h1>
          {desc && <p>{desc}</p>}
        </div>
        {examples ? examples.map((codeText, key) => <ExampleCard {...{ codeText, iso, scope, key }} />) : <LoadingSpinner />}
      </div>
    );
  }

}
