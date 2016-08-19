import React from 'react';
import Markdown from 'react-remarkable';
import { props, t } from '../../utils';

@props({
  content: t.struct({
    content: t.String
  })
})
export default class Content extends React.Component {

  render() {
    return (
      <div className='content'>
        <div className='body markdown-body'>
          <Markdown source={this.props.content.content} options={{ html: true }} />
        </div>
      </div>
    );
  }

}
