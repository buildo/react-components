class Example extends React.Component {

  state = {
    sortBy: 'name',
    sortDir: 'asc',
    columnWidths: {}
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

  onColumnResize = ({ width, key }) => {
    this.setState({
      columnWidths: {
        ...this.state.columnWidths,
        [key]: parseInt(width)
      }
    });
  };

  onHoveredRowChange = (rowIndex) => {
    this.setState({ hoveredRowIndex: rowIndex });
  }

  onRowsSelect = (selectedRows) => {
    this.setState({ selectedRows });
  }

  render() {

    const {
      data, rowHeight, onSortChange, onColumnResize, onHoveredRowChange, onRowsSelect,
      state: { sortBy: sortByField, sortDir, columnWidths, hoveredRowIndex, selectedRows }
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
          onColumnResize={onColumnResize}
          selectionType='single'
          hoveredRowIndex={hoveredRowIndex}
          onHoveredRowChange={onHoveredRowChange}
          selectedRows={selectedRows}
          onRowsSelect={onRowsSelect}          
        >

          <TabloColumn name='name' fixed width={columnWidths.name}>
            <Header>Name</Header>
          </TabloColumn>

          <TabloColumn name='age' width={columnWidths.age}>
            <Header>Age</Header>
          </TabloColumn>

          <TabloColumn name='occupation' sortable={false} width={columnWidths.occupation}>
            <Header>Occupation</Header>
            <Cell>{occupation => <span style={{ fontWeight: 700 }}>{occupation}</span>}</Cell>
          </TabloColumn>

        </Tablo>
      </FlexView>
    );
  }
}
