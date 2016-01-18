import React from 'react';
import LiveDemo from './LiveDemo';

export default class ExampleCard extends React.Component {

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    codeText: React.PropTypes.string.isRequired
  }

  render() {
    const { scope, codeText, iso } = this.props;
    return (
      <div className='example-card'>
        <LiveDemo {...{ codeText, iso, scope }} />
      </div>
    );
  }

}
