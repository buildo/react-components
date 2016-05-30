import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Playground from 'component-playground';
import MoreOrLess from '../../more-or-less/MoreOrLess';

const footer = '\n__render(Example);';
const footerISO = '\n__renderISO(Example);';

export default class LiveDemo extends React.Component {

  static propTypes = {
    iso: React.PropTypes.bool,
    scope: React.PropTypes.object.isRequired,
    codeText: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { showCode: false };
  }

  componentDidMount() {
    if (this.props.iso) {
      this.contentNodeISO = ReactDOM.findDOMNode(this.refs.contentNodeISO);
      this.contentNodeISO.innerHTML = ReactDOMServer.renderToString(this.getContentISO());
      ReactDOM.render(this.getContentISO(), this.contentNodeISO);
    }
    this.contentNode = ReactDOM.findDOMNode(this.refs.contentNode);
    this.forceUpdate();
  }

  componentDidUpdate() {
    const playground = ReactDOM.findDOMNode(this.refs.playground);
    if (playground) {
      playground.click();
    }
    if (this.props.iso) {
      ReactDOM.render(this.getContentISO(), this.contentNodeISO);
    }
  }

  __render = (Example) => {
    (new Example()).render(); // let Playground catch eventual errors in "Example.render"

    const content = (
      <div style={{ position: 'relative', zIndex: 100 }}>
        <Example />
      </div>
    );
    setTimeout(() => ReactDOM.render(content, this.contentNode));
  };

  __renderISO = (Example) => {
    (new Example()).render(); // let Playground catch eventual errors in "Example.render"

    const content = (
      <div>
        <p>ISOMORPHIC TEST</p>
        <div style={{ position: 'relative', zIndex: 100 }}>
          <Example />
        </div>
      </div>
    );
    setTimeout(() => ReactDOM.render(content, this.contentNodeISO));
  };

  getContentISO = () => {
    const { scope, codeText } = this.props;
    const __renderISO = this.__renderISO;
    return <Playground codeText={codeText + footerISO} scope={{ ...scope, __renderISO }} es6Console />;
  };

  toggleCode = () => this.setState({ showCode: !this.state.showCode });

  render() {
    const {
      props: { scope, codeText, iso },
      state: { showCode },
      __render, toggleCode
    } = this;

    return (
      <div className='live-demo'>
        <div className='component' ref='contentNode' />
        {iso && <div className='iso-demo component' ref='contentNodeISO' />}
        {!showCode && <div className='show-code cm-s-monokai CodeMirror' onClick={toggleCode}>SHOW CODE</div>}
        <MoreOrLess expanded={showCode} onExpandedChange={toggleCode} icons={{ expanded: 'angle-up', collapsed: 'angle-down' }}>
          <div style={showCode ? undefined : { position: 'absolute', pointerEvents: 'none', opacity: 0, height: 10, zIndex: -1, overflow: 'hidden' }}>
            {this.contentNode &&
              <Playground codeText={codeText + footer} scope={{ ...scope, __render }} es6Console ref='playground' />
            }
          </div>
        </MoreOrLess>
      </div>
    );
  }

}
