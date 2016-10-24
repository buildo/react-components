class Example extends React.Component {

  data = [{
    name: 'gabro',
    age: 26,
    occupation: 'Software Engineer'
  }, {
    name: 'franci',
    age: 24,
    occupation: 'Component Engineer'
  }, {
    name: 'daniele',
    age: 26,
    occupation: 'CFO'
  }];

  render() {

    const rowHeight = 40;

    return (
      <FlexView style={{ height: (this.data.length + 1) * rowHeight, width: '100%' }}>
        <Tablo
          data={this.data}
          rowHeight={rowHeight}
        >

          <TabloColumn name='name' fixed>
            <Header>Name</Header>
          </TabloColumn>

          <TabloColumn name='age'>
            <Header>Age</Header>
          </TabloColumn>

          <TabloColumn name='occupation'>
            <Header>Occupation</Header>
            <Cell>{occupation => <span style={{ fontWeight: 700 }}>{occupation}</span>}</Cell>
          </TabloColumn>

        </Tablo>
      </FlexView>
    );
  }
}
