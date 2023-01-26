### Examples

```js
const [state, setState] = React.useState({
  sortBy: 'name',
  sortDir: 'asc',
  columnWidths: {},
  columnsOrder: []
});

const rowHeight = 40;

function onSortChange({ sortBy, sortDir }) {
  setState({ sortBy, sortDir });
}

function onColumnResize({ width, key }) {
  setState({
    columnWidths: {
      ...state.columnWidths,
      [key]: parseInt(width)
    }
  });
}

function onRowsSelect(selectedRows) {
  setState({ selectedRows });
}

function onColumnsReorder(columnsOrder) {
  setState({ columnsOrder });
}

const { sortBy: sortByField, sortDir, columnWidths, selectedRows, columnsOrder } = state;
const sortedData = sortBy(tabloData, sortByField);

<FlexView style={{ height: 300, width: '100%' }}>
  <Tablo
    rowClassNameGetter={index => `row-${index}`}
    data={sortDir === 'desc' ? sortedData.reverse() : sortedData}
    rowHeight={rowHeight}
    onSortChange={onSortChange}
    sortBy={sortByField}
    sortDir={sortDir}
    onColumnResize={onColumnResize}
    selectionType="single"
    selectedRows={selectedRows}
    onRowsSelect={onRowsSelect}
    columnsOrder={columnsOrder}
    onColumnsReorder={onColumnsReorder}
  >
    <TabloColumn name="index" fixed width={40} isResizable={false} sortable={false}>
      <Header />
      <Cell render={(_, __, index) => index} />
    </TabloColumn>

    <TabloColumn name="salutation" width={columnWidths.salutation}>
      <Header>Salutation</Header>
      <Cell
        render={(_, { name, city }) => (
          <span style={{ fontStyle: 'italic' }}>
            "Hello! I am {name.split(' ')[0]} from {city}
            !"
          </span>
        )}
      />
    </TabloColumn>

    <TabloColumn name="avatar" fixed width={40} sortable={false} isResizable={false}>
      <Header />
      <Cell render={avatar => <img src={avatar} height={40} width={40} />} />
    </TabloColumn>

    <TabloColumn name="name" fixed width={columnWidths.name}>
      <Header>Name</Header>
      <Cell render={name => <span style={{ fontWeight: 700 }}>{name}</span>} />
    </TabloColumn>

    <TabloColumn name="city" width={columnWidths.city}>
      <Header>City</Header>
    </TabloColumn>

    <TabloColumn name="email" width={columnWidths.email}>
      <Header>Email</Header>
      <Cell
        render={email => (
          <TextOverflow lazy label={email}>
            {self => (
              <Tooltip popover={{ content: email, attachToBody: true }} style={{ width: '100%' }}>
                {self}
              </Tooltip>
            )}
          </TextOverflow>
        )}
      />
    </TabloColumn>

    <TabloColumn name="company" isResizable={false} flexGrow={1}>
      <Header>Company</Header>
    </TabloColumn>
  </Tablo>
</FlexView>;
```

#### Controlled scrolling

Tablo allows you to control scrolling. In the following example, after the table get focus (e.g. by clicking on it), you can scroll it using the arrow keys.<br />`UP` and `DOWN` arrows will change the selected entry, while `LEFT` and `RIGHT` arrows will control the horizontal scrolling.

```js
intialState = { scrollLeft: 0 };

function onRowsSelect(selectedRows) {
  setState({ selectedRows });
}

function onScrollEnd(scrollLeft) {
  setState({ scrollLeft });
}

const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

const keyHandlerMap = {
  [ARROW_UP]: () => {
    const selectedRow = state.selectedRows && state.selectedRows[0];
    setState({ selectedRows: [selectedRow > 0 ? selectedRow - 1 : 0] });
  },
  [ARROW_DOWN]: () => {
    const selectedRow = (state.selectedRows && state.selectedRows[0] + 1) || 0;
    if (selectedRow < tabloData.length) {
      setState({ selectedRows: [selectedRow] });
    }
  },
  [ARROW_LEFT]: () => setState({ scrollLeft: Math.max(state.scrollLeft - 40, 0) }),
  [ARROW_RIGHT]: () => setState({ scrollLeft: state.scrollLeft + 40 })
};

function onKeyDown(e) {
  if ([ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN].includes(e.keyCode)) {
    keyHandlerMap[e.keyCode]();
    e.preventDefault();
  }
}

const { scrollTop, scrollLeft, selectedRows } = state;

<FlexView tabIndex={0} height={300} width="100%" onKeyDown={onKeyDown}>
  <Tablo
    data={tabloData}
    rowHeight={40}
    selectionType="single"
    scrollTop={scrollTop}
    scrollLeft={scrollLeft}
    onColumnResize={() => {}}
    onScrollEnd={onScrollEnd}
    onRowsSelect={onRowsSelect}
    selectedRows={selectedRows}
  >
    <TabloColumn name="avatar" isResizable={false} width={40}>
      <Header />
      <Cell render={avatar => <img src={avatar} height={40} width={40} />} />
    </TabloColumn>

    <TabloColumn name="name" isResizable={false} width={300}>
      <Header>Name</Header>
    </TabloColumn>

    <TabloColumn name="city" isResizable={false} width={400}>
      <Header>City</Header>
    </TabloColumn>

    <TabloColumn name="email" isResizable={false} width={400}>
      <Header>Email</Header>
    </TabloColumn>

    <TabloColumn name="company" isResizable={false} width={400}>
      <Header>Company</Header>
    </TabloColumn>
  </Tablo>
</FlexView>;
```
