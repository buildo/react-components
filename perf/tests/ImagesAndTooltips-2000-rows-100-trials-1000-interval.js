import React from 'react';
import View from 'react-flexview';
import faker from 'faker';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';
import Grid from 'web-shared/src/app/components/Basic/Grid/Grid';
import Tablo, { Column, Header, Cell } from '../../src/tablo';
import Tooltip from '../../src/Tooltip';
import Perf from 'react-addons-perf';

const NUMBER_OF_ROWS = 20000;
const NUMBER_OF_TRIALS = 100;
const INTERVAL = 1000;

const getRandomRow = () => {
  return {
    avatar: faker.image.avatar(),
    name: faker.name.findName(),
    city: faker.address.city(),
    email: faker.internet.email(),
    company: faker.company.companyName()
  };
};
const data = range(NUMBER_OF_ROWS).map(getRandomRow);
const datas = range(NUMBER_OF_TRIALS).map(() => shuffle(data));

const columns = Object.keys(getRandomRow()).map(key => ({
  key,
  label: key,
  width: 200
}));

const imgRenderer = (src) => <img src={src} width='40' height='40' />;
const tooltipped = (any) => <Tooltip popover={{ content: any }}><div>{any}</div></Tooltip>;

const cellRenderer = (data, selected, key) => {
  return ({
    avatar: imgRenderer
  }[key] || tooltipped)(data);
};

class Gridone extends React.Component { //eslint-disable-line

  render() {
    return (
      <Grid data={this.props.data} columns={columns} cellRenderer={cellRenderer}/>
    );
  }

}

class Tablone extends React.Component {  //eslint-disable-line

  render() {
    return (
      <Tablo data={this.props.data} selectionType='none'>

        <Column name='avatar'>
          <Cell>{imgRenderer}</Cell>
        </Column>

        <Column name='name'>
          <Cell>{tooltipped}</Cell>
        </Column>

        <Column name='city'>
          <Cell>{tooltipped}</Cell>
        </Column>

        <Column name='email'>
          <Cell>{tooltipped}</Cell>
        </Column>

        <Column name='company'>
          <Cell>{tooltipped}</Cell>
        </Column>

      </Tablo>
    );
  }

}

export default class Component extends React.Component { //eslint-disable-line react/no-multi-comp

  state = { index: 0, componento: 'grido' }

  componentDidMount() {
    const testComponento = (componento) => {
      console.log('setState', this.state); //eslint-disable-line
      Perf.start();
      this.setState({ componento, index: 0 }); //eslint-disable-line
      this.interval = setInterval(() => {
        console.log('setState', this.state); //eslint-disable-line
        if (this.state.index < NUMBER_OF_TRIALS - 1) {
          this.setState({ index: this.state.index + 1 }); //eslint-disable-line
        } else {
          Perf.stop();
          Perf.printWasted();
          clearInterval(this.interval);
        }
      }, INTERVAL);
    };

    testComponento('grido');
    setTimeout(() => testComponento('tablo'), NUMBER_OF_TRIALS * INTERVAL + 10000);


  }

  render() {

    return (
      <View width='100%'>
        <View height={600} grow style={{ position: 'relative' }}>
          {this.state.componento === 'grido' ? (
            <Gridone data={datas[this.state.index]} />
          ) : (
            <Tablone data={datas[this.state.index]} />
          )}
        </View>
      </View>

    );
  }
}
