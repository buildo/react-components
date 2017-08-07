// import ScrollView from 'buildo-react-components/lib/ScrollView';

const Card = () => (
  <FlexView shrink={false} column style={{ paddingRight: 30 }}>

  </FlexView>
);

class Text extends React.Component {
  state = {
    height: undefined,
    text: ''
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      text: 'Vinyl pug cray meh, pabst lyft retro fashion axe pickled. Tbh seitan unicorn, raw denim wayfarers edison bulb letterpress shoreditch put a bird on it lomo. Helvetica scenester cronut, trust fund lumbersexual normcore cray pour-over pinterest single-origin coffee pug glossier. Godard slow-carb kitsch, heirloom pug intelligentsia art party cornhole chicharrones lumbersexual man bun. Subway tile shabby chic narwhal, hella pour-over paleo coloring book intelligentsia bushwick selvage migas gentrify single-origin coffee. Schlitz chicharrones fanny pack trust fund green juice, gochujang hexagon drinking vinegar slow-carb truffaut pabst pitchfork. Retro gentrify synth, pop-up snackwave lo-fi blue bottle bicycle rights fanny pack iceland.'
    }), 3500);
  }

  render() {
    return <FlexView width='100%' style={{ fontSize: 18, lineHeight: 1.4, color: '#727a86' }}>{this.state.text}</FlexView>;
  }
}

class Example extends React.Component {
  state = {
    height: 500
  }

  componentDidMount() {
    // setTimeout(() => this.setState({ height: 500 }), 2000);
  }

  render() {
    return (
      <FlexView height={this.state.height} width={100}>
        <ScrollView>
          <div style={{ width: 200, fontSize: 28, fontWeight: 'bold', color: '#313d4f', marginBottom: 10 }}>The last days of disco</div>
          <div style={{ fontSize: 14, color: '#313d4f', marginBottom: 10 }}>by <span style={{ color: '#1a91eb' }}>Luella Todd</span> | 7th of March</div>
          <Text />
        </ScrollView>
      </FlexView>
    );
  }

}
