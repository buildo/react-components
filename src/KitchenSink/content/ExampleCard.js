import React from 'react';
import { props, t } from '../../utils';
import LiveDemo from './LiveDemo';

@props({
  iso: t.maybe(t.Boolean),
  scope: t.Object,
  codeText: t.String
})
export class ExampleCard extends React.Component {

  render() {
    const { scope, codeText, iso } = this.props;
    return (
      <div className='example-card'>
        <LiveDemo {...{ codeText, iso, scope }} />
      </div>
    );
  }

}
