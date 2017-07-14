class Example extends React.Component {

  state = { scrollLeft: 0 }

  onRowsSelect = (selectedRows) => {
    this.setState({ selectedRows });
  }

  onScrollEnd = (x) => {
    this.setState({
      scrollLeft: x
    });
  }

  keyHandlerMap = {
    [ARROW_UP]: () => {
      const selectedRow = this.state.selectedRows && this.state.selectedRows[0];
      this.setState({ selectedRows: [ selectedRow > 0 ? selectedRow - 1 : 0 ] });
    },
    [ARROW_DOWN]: () => {
      const selectedRow = this.state.selectedRows && this.state.selectedRows[0] + 1 || 0;
      if (selectedRow < data.length) {
        this.setState({ selectedRows: [selectedRow] });
      }
    },
    [ARROW_LEFT]: () => {
      const scrollLeft = this.state.scrollLeft ? this.state.scrollLeft - 40 : 0;
      this.setState({ scrollLeft: scrollLeft >= 0 ? scrollLeft : 0 });

    },
    [ARROW_RIGHT]: () => {
      const scrollLeft = (this.state.scrollLeft || 0) + 40;
      this.setState({ scrollLeft });
    }
  }

  onKeyDown = (e) => {

    if (![ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN].includes(e.keyCode)) return;

    this.keyHandlerMap[e.keyCode]();

    e.preventDefault();
  }

  render() {

    const { onKeyDown, onScrollStart, onScrollEnd, onRowsSelect, state: { scrollTop, scrollLeft, selectedRows } } = this;

    return (
      <FlexView tabIndex={0} style={{ height: 300, width: '100%' }} onKeyDown={onKeyDown}>
        <Tablo
          data={data}
          rowHeight={40}
          selectionType='single'
          scrollTop={scrollTop}
          scrollLeft={scrollLeft}
          onColumnResize={() => {}}
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
          onRowsSelect={onRowsSelect}
          selectedRows={selectedRows}
        >

          <TabloColumn name='avatar' isResizable={false} width={40}>
            <Header></Header>
            <Cell>{ avatar => <img src={avatar} height={40} width={40} />}</Cell>
          </TabloColumn>

          <TabloColumn name='name' isResizable={false} width={300}>
            <Header>Name</Header>
          </TabloColumn>

          <TabloColumn name='city' isResizable={false} width={400}>
            <Header>City</Header>
          </TabloColumn>

          <TabloColumn name='email' isResizable={false} width={400}>
            <Header>Email</Header>
          </TabloColumn>

          <TabloColumn name='company' isResizable={false} width={400}>
            <Header>Company</Header>
          </TabloColumn>

        </Tablo>
      </FlexView>
    );
  }
}

const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

const getRandomRow = () => {
  return {
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    city: faker.address.city(),
    email: faker.internet.email(),
    company: faker.company.companyName()
  };
};

const data = Array.apply(null, Array(1000)).reduce(acc => [...acc, getRandomRow()], []);

