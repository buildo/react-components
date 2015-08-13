import React from 'react';

const ExampleView = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
    github: React.PropTypes.string.isRequired,
    demo: React.PropTypes.string,
  },

  render() {
    return (
      <div className='example-view-wrapper'>
        <div className='example-view'>
          <h1>{this.props.title}</h1>
          <p>{this.props.desc}</p>
          <img src={this.props.image} />
          <div className='links'>
            <a href={this.props.github}>GitHub</a>
            {this.props.demo && <a href={this.props.demo}> Demo</a>}
          </div>
        </div>
      </div>
    );
  }

});

export default ExampleView