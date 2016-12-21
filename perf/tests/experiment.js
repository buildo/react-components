import React from 'react';
import faker from 'faker';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';
import TextOverflow from '../../src/text-overflow';
import Tooltip from '../../src/Tooltip';
import { SimpleTablo } from '../../src/tablo';
import { SimpleTablo as SimpleTablo06, Column as Column06, Cell as Cell06, Header as Header06 } from './tablo06';
import Tablo, { Column, Cell, Header } from '../../src/tablo';
import Grid from 'web-shared/src/app/components/Basic/Grid/Grid';
import generator from './generator';

import { Table as TableFDT2, Column as ColumnFDT2, Cell as CellFDT2 } from 'fixed-data-table-2';
import { Table as TableFDT06, Column as ColumnFDT06, Cell as CellFDT06 } from 'fixed-data-table-06';
import FlexView from 'react-flexview';

const NUMBER_OF_ROWS = 2000;

const NUMBER_OF_TRIALS = 1;
const INTERVAL = 500;

const COLUMN_WIDTH = 200;

const cellRenderer = dataCell => (
  <FlexView grow height='100%'>
    <TextOverflow label={String(dataCell)}>
      {(children) => (
        <Tooltip style={{ width: '100%' }} popover={{ attachToBody: true, content: String(dataCell) }}>{children}</Tooltip>
      )}
    </TextOverflow>
  </FlexView>
);

const getColumns = ({ data, Column, Cell, Header }) => Object.keys(data[0] || {}).map(columnName => (
  <Column width={COLUMN_WIDTH} key={columnName} name={columnName}>
    <Header>{columnName}</Header>
    <Cell>{content => (
      <TextOverflow label={String(content)}>
        {self => (
          <Tooltip popover={{ content: String(content), attachToBody: true }} style={{ width: '100%' }}>
            {self}
          </Tooltip>
        )}
      </TextOverflow>
    )}</Cell>
  </Column>
));

const FixedDataTable2 = ({ data, ...props }) => {
  const columns = Object.keys(data[0] || {}).map(columnName => {
    return (
      <ColumnFDT2
        key={columnName}
        header={<CellFDT2>
          <FlexView vAlignContent='center' className='tablo-header'>{columnName}</FlexView>
        </CellFDT2>}
        cell={({ rowIndex, ...props }) => (
          <CellFDT2 {...props} className='tablo-cell'>
            <FlexView vAlignContent='center' className='tablo-cell'>
              <div className='content'>
                {data[rowIndex][columnName]}
              </div>
            </FlexView>
          </CellFDT2>
        )}
        width={COLUMN_WIDTH}
      />
    );
  });

  return (
    <FlexView column grow className='tablo'>
      <TableFDT2 {...props} rowsCount={data.length}>
        {columns}
      </TableFDT2>
    </FlexView>
  );
};

const FixedDataTable06 = ({ data, ...props }) => {

  class Cell extends React.Component {

    render() {
      const { data, rowIndex, columnKey, ...props } = this.props;
      return (
        <CellFDT06 {...props} className='tablo-cell'>
          <FlexView vAlignContent='center' className='tablo-cell'>
            <div className='content'>
              {data[rowIndex][columnKey]}
            </div>
          </FlexView>
        </CellFDT06>
      );
    }

  }

  const columns = Object.keys(data[0] || {}).map(columnName => {
    return (
      <ColumnFDT06
        key={columnName}
        columnKey={columnName}
        header={(
          <CellFDT06>
            <FlexView vAlignContent='center' className='tablo-header'>{columnName}</FlexView>
          </CellFDT06>
        )}
        cell={<Cell data={data} />}
        width={COLUMN_WIDTH}
      />
    );
  });

  return (
    <FlexView column grow className='tablo'>
      <TableFDT06 {...props} rowsCount={data.length}>
        {columns}
      </TableFDT06>
    </FlexView>
  );
};

const getRandomRow = (_, i) => {
  return {
    number: i,
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    city: faker.address.city(),
    email: faker.internet.email(),
    avatar1: faker.image.avatar(),
    avatar2: faker.image.avatar(),
    avatar3: faker.image.avatar(),
    avatar4: faker.image.avatar(),
    avatar5: faker.image.avatar(),
    avatar6: faker.image.avatar(),
    avatar7: faker.image.avatar(),
    avatar8: faker.image.avatar(),
    avatar9: faker.image.avatar(),
    avatar10: faker.image.avatar(),
    avatar11: faker.image.avatar(),
    avatar12: faker.image.avatar(),
    avatar13: faker.image.avatar(),
    avatar14: faker.image.avatar(),
    avatar15: faker.image.avatar(),
    avatar16: faker.image.avatar(),
    avatar17: faker.image.avatar(),
    avatar18: faker.image.avatar(),
    avatar19: faker.image.avatar(),
    avatar20: faker.image.avatar(),
    avatar21: faker.image.avatar(),
    avatar22: faker.image.avatar(),
    avatar23: faker.image.avatar()
    // company: faker.company.companyName()
  };
};

const DATA = range(NUMBER_OF_ROWS).map(getRandomRow);

const Component = (props) => {
  const tables = shuffle([
    // <FixedDataTable2 {...props} key='fixed-data-table-2' />,
    // <FixedDataTable06 {...props} key='fixed-data-table-06' />,
    <Tablo {...props} key='full-tablo' onColumnsReorder={() => console.log('reorder')}>
      {getColumns({ data: props.data, Column, Cell, Header })}
    </Tablo>,
    // <SimpleTablo {...props} key='tablo'>
    //   {getColumns({ data: props.data, Column, Cell, Header })}
    // </SimpleTablo>,
    // <SimpleTablo06 {...props} key='tablo06'>
    //   {getColumns({ data: props.data, Column: Column06, Cell: Cell06, Header: Header06 })}
    // </SimpleTablo06>,
    // <Grid
    //   {...props}
    //   height={298}
    //   width={998}
    //   autoSize={false}
    //   columns={Object.keys(props.data[0]).map(x => ({ key: x, label: x, width: COLUMN_WIDTH }))}
    //   key='grid'
    //   cellRenderer={cellRenderer}
    // />
  ]);

  window.tablesOrder = tables.map(t => t.key);

  return (
    <div>
      {tables.map(c => <div key={c.key}><br/>{c}</div>)}
    </div>
  );
};

export default generator({
  NUMBER_OF_TRIALS,
  INTERVAL,
  props: range(NUMBER_OF_TRIALS).map(() => ({
    data: DATA,
    headerHeight: 37,
    rowHeight: 30,
    width: 1000, height: 300
  })),
  Components: [Component]
});
