class Example extends React.Component {

  constructor() {
    super();
    this.state = { width: '' };
  }

  componentDidMount() {
    this.onResize();
  }

  onResize = () => {
    this.setState({ width: ReactDOM.findDOMNode(this).clientWidth });
  }

  render() {
    return (
      <ResizeSensor onResize={() => this.onResize()}>
        <FlexView
          grow
          height={50}
          hAlignContent='center'
          vAlignContent='center'
          style={{ background: 'red', fontSize: 25, color: 'white' }}
        >
          width: {this.state.width}
        </FlexView>
      </ResizeSensor>
    );
  }

}
