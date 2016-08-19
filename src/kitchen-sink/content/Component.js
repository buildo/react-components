import React from 'react';
import { props, t } from '../../utils';
import LoadingSpinner from '../../loading-spinner';
import ExampleCard from './ExampleCard';

@props({
  iso: t.maybe(t.Boolean),
  scope: t.Object,
  component: t.maybe(t.Object),
  header: t.maybe(t.ReactChildren),
  footer: t.maybe(t.ReactChildren)
})
export default class Component extends React.Component {

  getLoadingSpinner() {
    return (
      <div style={{ height: '100%', width: '100%', top: 0, left: 0, position: 'absolute' }}>
        <LoadingSpinner />
      </div>
    );
  }

  getExamples = (examples) => {
    const { scope, iso } = this.props;
    return [].concat(examples).map((codeText, key) => <ExampleCard {...{ codeText, iso, scope, key }} />);
  };

  render() {
    const { component, header, footer } = this.props;
    const { examples } = component || {};
    return (
      <div className='component'>
        <div className='header markdown-body'>
          {header}
        </div>
        <div className='examples'>
          {examples ? this.getExamples(examples) : this.getLoadingSpinner()}
        </div>
        <div className='footer markdown-body'>
          {footer}
        </div>
      </div>
    );
  }

}
