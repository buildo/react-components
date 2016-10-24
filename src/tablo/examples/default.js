class Example extends React.Component {

  state = {
    sortBy: 'name',
    sortDir: 'asc'
  }

  data = [{
    name: 'franci',
    age: 24,
    occupation: 'Component Engineer'
  },
  {
    name: 'gabro',
    age: 26,
    occupation: 'Software Engineer'
  }, {
    name: 'daniele',
    age: 26,
    occupation: 'CFO'
  }];

  rowHeight = 40;

  onSortChange = ({ sortBy, sortDir }) => {
    this.setState({ sortBy, sortDir });
  };

  render() {

    const {
      data, rowHeight, onSortChange,
      state: { sortBy: sortByField, sortDir }
    } = this;

    const sortedData = sortBy(data, sortByField);

    return (
      <FlexView style={{ height: (data.length + 1) * rowHeight, width: '100%' }}>
        <Tablo
          data={sortDir === 'desc' ? sortedData.reverse() : sortedData}
          rowHeight={rowHeight}
          onSortChange={onSortChange}
          sortBy={sortByField}
          sortDir={sortDir}
        >

          <TabloColumn name='name' fixed>
            <Header>Name</Header>
          </TabloColumn>

          <TabloColumn name='age'>
            <Header>Age</Header>
          </TabloColumn>

          <TabloColumn name='occupation' sortable={false}>
            <Header>Occupation</Header>
            <Cell>{occupation => <span style={{ fontWeight: 700 }}>{occupation}</span>}</Cell>
          </TabloColumn>

        </Tablo>
      </FlexView>
    );
  }
}
