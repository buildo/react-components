import React from 'react';
import faker from 'faker';
import range from 'lodash/range';
import { SimpleTablo } from '../../src/tablo';
import Tablo from '../../src/tablo';
import Grid from 'web-shared/src/app/components/Basic/Grid/Grid';
import generator from './generator';

const NUMBER_OF_ROWS = 200;

const NUMBER_OF_TRIALS = 1;
const INTERVAL = 500;

const Component = (props) => (
  <div>
    tablo completo
    <Tablo {...props} />
    tablo scarno
    <SimpleTablo {...props} />
    Grid
    <Grid {...props} columns={Object.keys(props.data[0]).map(x => ({ key: x, label: x }))} />
  </div>
);

const getRandomRow = (_, i) => {
  return {
    number: i,
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    city: faker.address.city(),
    email: faker.internet.email(),
    company: faker.company.companyName()
  };
};
const data = range(NUMBER_OF_ROWS).map(getRandomRow);

export default generator({
  NUMBER_OF_TRIALS,
  INTERVAL,
  props: range(NUMBER_OF_TRIALS).map(() => ({ data, width: 1000, height: 300 })),
  Components: [Component]
});
