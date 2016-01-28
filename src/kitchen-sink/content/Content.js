import React from 'react';
import Markdown from 'react-remarkable';

export default class Content extends React.Component {

  static propTypes = {
    content: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired
    }).isRequired
  };

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
