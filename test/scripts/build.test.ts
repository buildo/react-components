import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('build', () => {

  it('build script generates every needed file', () => {
    execSync('npm run build', { stdio:[] })

    const libFiles = fs.readdirSync(path.resolve(__dirname, '../../lib'));
    expect(libFiles).toMatchSnapshot()

    libFiles.forEach(_ => {
      const filePath = path.resolve(__dirname, '../../lib', _);
      if (fs.lstatSync(filePath).isDirectory()) {
        expect(fs.readdirSync(filePath)).toMatchSnapshot();
      }
    })
  })

})
