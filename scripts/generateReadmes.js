import fs from 'fs';
import path from 'path';
import t from 'tcomb';
import parse from './parse';
import template from './template';
import debug from 'debug';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

debug.enable('brc:*');
const log = () => {};// debug('brc:generate-readmes');

const checkDocs = (json, fileName) => {
  log('Checking extracted docs have necessary keys...');
  if (!json.name) {
    throw new Error(`Missing name for file ${fileName}`);
  }
  if (!json.description) {
    throw new Error(`Missing description for file ${fileName}.`);
  }

};

const generateReadMe = (dir, fileName) => {
  const filePath = path.join(dir, fileName);
  log(`Extracting docs from ${filePath}`);
  const json = parse(filePath);
  log(`Extracted: ${t.stringify(json)}`);
  checkDocs(json, fileName);
  const readMeContent = template(json);
  const readMeFilePath = path.join(dir, 'README.md');
  log(`Writing README.md for file '${fileName}'`);
  try {
    fs.writeFileSync(readMeFilePath, readMeContent, 'utf-8');
    log(`README.md for ${fileName} created at ${readMeFilePath}!`);
  } catch (e) {
    log(`Error creating ${fileName} README.md: ${t.stringify(e.getMessage())}`);
  }
};

const walkThroughDirs = (dir, parent, cb) => {
  if (fs.statSync(dir).isDirectory()) {
    log(`Walking through ${dir}`);
    fs.readdir(dir, (err, results = []) => {
      log(`${dir} contains: ${results.join('\n')}`);
      results
      .forEach(r => {
        const pathToCheck = path.join(dir, r);
        log(`Checking path: ${pathToCheck}`);
        if (fs.statSync(pathToCheck).isFile() && r === `${upperFirst(camelCase(parent))}.js`) {
          log(`${r} is a file!`);
          cb(dir, r);
        } else if (fs.statSync(pathToCheck).isDirectory()) {
          log(`${r} is a dir!`);
          walkThroughDirs(path.join(dir, r), r, cb);
        }
      });
    });
  } else {
    log(`${dir} is not a dir!`);
  }
};

const walkThroughFirstLevelDirs = (dir, cb) => {
  if (fs.statSync(dir).isDirectory()) {
    log(`Walking through "${dir}"`);

    const results = fs.readdirSync(dir);

    log(`"${dir}" contains: ${results.join('\n')}`);

    results.forEach(r => {
      const pathToCheck = path.join(dir, r);
      log(`Checking path: ${pathToCheck}`);
      if (fs.statSync(pathToCheck).isDirectory()) {
        const mainFileName = `${upperFirst(camelCase(r))}.js`;

        const mainFilePath = path.join(dir, r, mainFileName);

        let isFile = null;
        try {
          isFile = fs.statSync(mainFilePath).isFile();
        } catch (e) {
          log(e);
        }

        if (isFile) {
          log(`"${r}" contains a main file: "${mainFileName}"!`);
          cb(pathToCheck, mainFileName);
        } else {
          log(`"${r}" does not contain a main file...`);
        }
      } else {
        log(`"${r}" is a file: ignoring!`);
      }
    });
  } else {
    log(`"${dir}" is not a directory!`);
  }
};

const _root = process.argv[2] || 'src';

walkThroughFirstLevelDirs(path.resolve(_root), generateReadMe);
