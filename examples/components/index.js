import { sortBy } from 'lodash';
import examplesJSON from 'raw!./examples.json';
import './styles';

const json = JSON.parse(examplesJSON);

function dynamicRequire(e) {
  const path = e.match(/\/components\/(.+).example/)[1];
  return require(`raw!./${path}.example`);
}

const components = sortBy(json.components, 'title').map(c => ({
  ...c,
  examples: c.examples.map(dynamicRequire)
}));

export default [{ ...json, components }];
