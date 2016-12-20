import React from 'react';
import faker from 'faker';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';
import { SimpleTablo } from '../../src/tablo';
import { SimpleTablo as SimpleTablo06 } from './tablo06';
import Tablo from '../../src/tablo';
import Grid from 'web-shared/src/app/components/Basic/Grid/Grid';
import generator from './generator';

import { Table as TableFDT2, Column as ColumnFDT2, Cell as CellFDT2 } from 'fixed-data-table-2';
import { Table as TableFDT06, Column as ColumnFDT06, Cell as CellFDT06 } from 'fixed-data-table-06';
import FlexView from 'react-flexview';

const NUMBER_OF_ROWS = 200;

const NUMBER_OF_TRIALS = 1;
const INTERVAL = 500;

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
        width={200}
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
        width={200}
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
    email: faker.internet.email()
    // company: faker.company.companyName()
  };
};
const data = range(NUMBER_OF_ROWS).map(getRandomRow);

const Component = ({ gridColumns, ...props }) => {
  const tables = shuffle([
    <FixedDataTable2 {...props} key='fixed-data-table-2' />,
    <FixedDataTable06 {...props} key='fixed-data-table-06' />,
    <Tablo {...props} key='full-tablo' />,
    <SimpleTablo {...props} key='tablo' />,
    <SimpleTablo06 {...props} key='tablo06' />,
    <Grid {...props} height={298} width={998} autoSize={false} columns={gridColumns} key='grid' />
  ]);

  window.tablesOrder = tables.map(t => t.key);

  return (
    <div>
      {tables.map(c => <p key={c.key}>{c}</p>)}
    </div>
  );
};

export default generator({
  NUMBER_OF_TRIALS,
  INTERVAL,
  props: range(NUMBER_OF_TRIALS).map(() => ({
    data,
    headerHeight: 37,
    rowHeight: 30,
    gridColumns: Object.keys(data[0]).map(x => ({ key: x, label: x, width: 200 })),
    width: 1000, height: 300
  })),
  Components: [Component]
});
