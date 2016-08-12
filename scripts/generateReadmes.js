import fs from 'fs';
import path from 'path';
import t from 'tcomb';
import parse from './parse';
import template from './template';
import debug from 'debug';

debug.enable('brc:*');
const log = debug('brc:generate-readmes');

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

const walkThroughDirs = (dir, cb) => {
  if (fs.statSync(dir).isDirectory()) {
    log(`Walking through ${dir}`);
    fs.readdir(dir, (err, results = []) => {
      log(`${dir} contains: ${results.join('\n')}`);
      results
      .filter(r => r !== 'index.js' && ['', '.js'].indexOf(path.extname(r)) > -1)
      .forEach(r => {
        const pathToCheck = path.join(dir, r);
        log(`Checking path: ${pathToCheck}`);
        if (fs.statSync(pathToCheck).isFile() && path.extname(r) === '.js') {
          log(`${r} is a file!`);
          cb(dir, r);
        } else if (fs.statSync(pathToCheck).isDirectory()) {
          log(`${r} is a dir!`);
          walkThroughDirs(path.join(dir, r), cb);
        }
      });
    });
  } else {
    log(`${dir} is not a dir!`);
  }
};

const root = process.argv[2] || 'src';

walkThroughDirs(path.resolve(root), generateReadMe);
