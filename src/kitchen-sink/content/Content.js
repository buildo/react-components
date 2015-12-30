import React from 'react';
import LoadingSpinner from '../../loading-spinner';
import ExampleCard from './ExampleCard';

export default class Content extends React.Component {

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    examples: React.PropTypes.array
  }

  render() {
    const { scope, examples, iso } = this.props;
    return (
      <div className='content'>
        {examples ? examples.map(codeText => <ExampleCard {...{ codeText, iso, scope }} />) : <LoadingSpinner />}
      </div>
    );
  }

}
