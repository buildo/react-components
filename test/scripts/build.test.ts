import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import flatten = require('lodash/flatten');

describe('build', () => {
  it('build script generates every needed file', () => {
    execSync('npm run build', { stdio: [] });

    const libFiles = fs.readdirSync(path.resolve(__dirname, '../../lib'));

    const files = flatten(
      libFiles.map(fileInRoot => {
        const filePath = path.resolve(__dirname, '../../lib', fileInRoot);
        if (fs.lstatSync(filePath).isDirectory()) {
          return fs.readdirSync(filePath).map(fileInFolder => `${fileInRoot}/${fileInFolder}`);
        }
        return fileInRoot;
      })
    );

    expect(files).toMatchSnapshot();
  });
});
