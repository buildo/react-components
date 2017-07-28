// import ScrollView from 'buildo-react-components/lib/ScrollView';

const Card = () => (
  <FlexView column style={{ paddingRight: 30 }}>
    <div style={{ fontSize: 28, fontWeight: 'bold', color: '#313d4f', marginBottom: 10 }}>The last days of disco</div>
    <div style={{ fontSize: 14, color: '#313d4f', marginBottom: 10 }}>by <span style={{ color: '#1a91eb' }}>Luella Todd</span> | 7th of March</div>
    <img alt='scrollscroll' style={{ width: '100%', marginBottom: 10 }} src='../src/ScrollView/examples/scroll.gif' />
    <div style={{ fontSize: 18, lineHeight: 1.4, color: '#727a86' }}>Vinyl pug cray meh, pabst lyft retro fashion axe pickled. Tbh seitan unicorn, raw denim wayfarers edison bulb letterpress shoreditch put a bird on it lomo. Helvetica scenester cronut, trust fund lumbersexual normcore cray pour-over pinterest single-origin coffee pug glossier. Godard slow-carb kitsch, heirloom pug intelligentsia art party cornhole chicharrones lumbersexual man bun. Subway tile shabby chic narwhal, hella pour-over paleo coloring book intelligentsia bushwick selvage migas gentrify single-origin coffee. Schlitz chicharrones fanny pack trust fund green juice, gochujang hexagon drinking vinegar slow-carb truffaut pabst pitchfork. Retro gentrify synth, pop-up snackwave lo-fi blue bottle bicycle rights fanny pack iceland.</div>
  </FlexView>
);

class Example extends React.Component {

  render() {
    return (
      <FlexView style={{ height: 500 }}>
        <ScrollView>
          <Card />
        </ScrollView>
      </FlexView>
    );
  }

}
