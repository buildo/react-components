import React from 'react';
import Playground from 'component-playground';
import ScrollView from '../../scroll';

const footer = '\n__render(Example);';
const footerISO = '\n__renderISO(Example);';

export default class LiveDemo extends React.Component {

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    codeText: React.PropTypes.string.isRequired
  }

  componentDidMount() {
    if (this.props.iso) {
      this.contentNodeISO = this.refs.contentNodeISO.getDOMNode();
      this.contentNodeISO.innerHTML = React.renderToString(this.getContentISO());
      React.render(this.getContentISO(), this.contentNodeISO);
    }
    this.contentNode = this.refs.contentNode.getDOMNode();
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.props.iso) {
      React.render(this.getContentISO(), this.contentNodeISO);
    }
  }

  __render = (Example) => {
    const content = (
      <div style={{ position: 'relative'}}>
        <Example />
      </div>
    );
    React.render(content, this.contentNode);
  }

  __renderISO = (Example) => {
    const content = (
      <div>
        <p>ISOMORPHIC TEST</p>
        <div style={{ position: 'relative'}}>
          <Example />
        </div>
      </div>
    );
    React.render(content, this.contentNodeISO);
  }

  getContentISO = () => {
    const { scope, codeText } = this.props;
    const __renderISO = this.__renderISO;
    return <Playground codeText={codeText + footerISO} scope={{ ...scope, __renderISO }} es6Console />;
  }

  render() {
    const { scope, codeText, iso } = this.props;
    const __render = this.__render;
    return (
      <div className='live-demo'>
        {this.contentNode &&
          <ScrollView scrollPropagation={false}>
            <Playground codeText={codeText + footer} scope={{ ...scope, __render }} es6Console />
          </ScrollView>
        }
        <div className='component' ref='contentNode' />
        {iso && <div className='iso-demo component' ref='contentNodeISO' />}
      </div>
    );
  }

}
