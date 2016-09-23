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
          style={{ background: '#1a91eb', fontSize: 18, fontWeight: '600', color: 'white' }}
        >
          Width: {this.state.width}
        </FlexView>
      </ResizeSensor>
    );
  }

}
