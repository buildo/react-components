import expect from 'expect';
import * as exportz from '../../src';
const shouldExport = [
  'linkState',
  'getValueLink'
];
const shouldExportComponent = [
  'CookieBanner',
  'DatePicker', 'DatePickerInput',
  'Dropdown',
  'FlexView', 'FlexCell',
  'InputLink',
  'LoadingSpinner',
  'Popover',
  'TextareaAutosize',
  'MobileDetector'
];
const expectExport = k => () => {
  expect(exportz[k].name).toExist();
};
const expectExportComponent = k => () => {
  expect([typeof exportz[k], exportz[k].name, exportz[k].displayName]).toInclude(k);
};

describe('index.js', () => {

  shouldExport.forEach(ex => it(`should export ${ex}`,
    expectExport(ex)
  ));

  shouldExportComponent.forEach(ex => it(`should export component ${ex}`,
    expectExportComponent(ex)
  ));

});
