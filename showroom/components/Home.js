import React from 'react';
import FlexView from 'react-flexview';
import KitchenSink from '../../src/kitchen-sink';
import Button from '../../src/button';
import { t, props } from 'tcomb-react';
import packageJson from 'json!../../package.json';

require('../icons/rocket.png');
require('../icons/tools.png');
require('../icons/window.png');
require('../icons/rocket@2x.png');
require('../icons/tools@2x.png');
require('../icons/window@2x.png');

import './home.scss';

@props({
  router: t.Function,
  query: t.Object,
  params: t.Object,
  sections: t.Array,
  openSections: t.Array,
  onToggleSection: t.Function,
  scope: t.Object,
  onSelectItem: t.Function
})
export default class Home extends React.Component {

  onGetStartedClick = () => {
    this.props.router.transitionToPatch('content', {
      sectionId: 'getting-started', contentId: 'getting-started'
    });
  }

  onStarClick = () => {
    window.open('https://github.com/buildo/react-components', '_blank');
  }

  render() {

    const {
      params: { sectionId, contentId },
      onSelectItem,
      openSections, onToggleSection,
      sections
    } = this.props;

    const ColumnTemplate = ({ title, icon, children }) => (
      <FlexView column shrink basis='100%'>
        <FlexView basis={50} vAlignContent='center' style={{ marginBottom: 10 }}>
          {icon && <img src={`./showroom/icons/${icon}.png`} srcSet={`./showroom/icons/${icon}@2x.png 2x`} />}
        </FlexView>
        <h2 style={{ lineHeight: 1, margin: 0 }}>{title}</h2>
        {children}
      </FlexView>
    );


    return (
      <KitchenSink {...{ sections, openSections, sectionId, onToggleSection, contentId, onSelectItem, loading: false }}>
        <FlexView column className='home'>
          <FlexView column className='header' hAlignContent='center'>
            <FlexView shrink={false} className='title'>buildo react components</FlexView>
            <FlexView shrink={false} className='subtitle'>Reusable components by buildo</FlexView>
            <FlexView shrink={false} className='action-buttons'>
              <Button flat label='Get Started' onClick={this.onGetStartedClick} />
              <Button flat label='Star' icon='github' onClick={this.onStarClick} />
            </FlexView>
            <FlexView shrink={false} className='current-release'>
              {`Current release: ${packageJson.version}`}
            </FlexView>
            <FlexView shrink={false} className='pattern' />
          </FlexView>
          <FlexView column className='content'>
            <h1>Introduction</h1>
            <p>This is a collection of some of the most reusable React components built at Buildo. In the jQuery ecosystem there's a large collection of plugins that can be used for anything from modals to translation. We're trying to make it just as easy to jumpstart React applications with a well-tested, thoughtful, and beautiful library of components.</p>
            <p>Most of our components are bespoke, so if you're already invested in a UI framework like Bootstrap, Topcoat, or KendoUI, you should check to see if there's an existing React wrapper for your framework.</p>
            <h1>Goals</h1>
            <FlexView>
              <ColumnTemplate title='Open Source' icon='rocket'>
                <p>Etsy whatever vice marfa normcore cred. Chartreuse direct trade schlitz, retro fixie trust fund slow-carb raw.</p>
              </ColumnTemplate>
              <ColumnTemplate title='Build Tools' icon='tools'>
                <p>Etsy whatever vice marfa normcore cred. Chartreuse direct trade schlitz, retro fixie trust fund slow-carb raw.</p>
              </ColumnTemplate>
              <ColumnTemplate title='Cohesive design language' icon='window'>
                <p>Etsy whatever vice marfa normcore cred. Chartreuse direct trade schlitz, retro fixie trust fund slow-carb raw.</p>
              </ColumnTemplate>
            </FlexView>
          </FlexView>
        </FlexView>
      </KitchenSink>
    );
  }

}
