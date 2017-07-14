import React from 'react';
import FlexView from 'react-flexview';
import KitchenSink from '../../src/KitchenSink';
import Button from '../../src/Button';
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
      <FlexView className='column-template' column shrink basis='100%'>
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
            <p>
              This is a collection of reusable React components created at Buildo
            </p>
            <p>
              Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized
            </p>
            <h1>Goals</h1>
            <FlexView>
              <ColumnTemplate title='Highly customizable' icon='tools'>
                <p>
                  The library integrates with your Webpack workflow and it's easily customizable and very flexible.
                  <br />
                  While style agnostic, all the components have a sane default style that can be totally overridden through Sass variables
                </p>
              </ColumnTemplate>
              <ColumnTemplate title='Designed with expertise' icon='window'>
                <p>
                  Designed by React devs for React devs, written in ES6 and Sass, built with Babel and Webpack
                </p>
              </ColumnTemplate>
              <ColumnTemplate title='Live playground' icon='rocket'>
                <p>
                  Check our showroom and try all the components with live examples.
                  <br />
                  We've created a playground so you don't need to install anything to learn how the components work, look and behave
                </p>
              </ColumnTemplate>
            </FlexView>
          </FlexView>
        </FlexView>
      </KitchenSink>
    );
  }

}
