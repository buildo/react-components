// import Overflow from 'buildo-react-components/lib/Overflow';

class Example extends React.Component {

  getContent(isOverflowing) {
    return (
      <FlexView
        width={200}
        vAlignContent='center'
        style={{
          color: 'white',
          background: isOverflowing ? '#d1236d' : '#1a91eb',
          padding: 10
        }}
      >
        Is overflowing: {String(isOverflowing)}
      </FlexView>
    );
  }

  render() {
    return (
      <FlexView style={{ background: '#f0f3f8', borderRadius: 3, overflow: 'hidden' }}>
        <Overflow
          content={this.getContent(false)}
          contentIfOverflowing={this.getContent(true)}
        />
      </FlexView>
    );
  }

}
