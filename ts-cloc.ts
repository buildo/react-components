const exec = require('child_process').execSync;
const fs = require('fs');

const listDirectories = (p: string): string[] => fs.readdirSync(p).filter((f: string) => fs.statSync(`${p}/${f}`).isDirectory());

const isDir100PercentTS = (path: string): boolean => {
  const JSLines = exec(`node_modules/.bin/cloc --csv --quiet --exclude-dir=examples src/${path}/`, { encoding: 'utf8' }).split('\n')
    .filter((line: string) => line.indexOf('JavaScript') !== -1);
  
  return JSLines.length === 0;
};

// COMPONENTS
const dirs = listDirectories('src');
const dirsInTS = dirs.filter(isDir100PercentTS);

console.log(`components in TS: ${dirsInTS.length / dirs.length * 100}% (${dirsInTS.length} out of ${dirs.length} components)`);

// TESTS
const langs = exec('node_modules/.bin/cloc --csv --quiet test/components/', { encoding: 'utf8' }).split('\n')
  .filter((line: string) => line.indexOf('JavaScript') !== -1 || line.indexOf('TypeScript') !== -1)
  .map((line: string) => {
    const parts = line.split(',');
    return { language: parts[1], files: parseInt(parts[0], 10), code: parseInt(parts[4], 10) };
  }).reduce((ac: any, l: { language: string, files: number, code: number }) => Object.assign({}, ac, {
    [l.language]: { files: l.files, code: l.code }
  }), {});
const ts = langs.TypeScript;
const js = langs.JavaScript;
const totCode = ts.code + js.code;
const totFiles = ts.files + js.files;
const out = `tests in TS: ${Math.round(100 * (ts.code / totCode))}% (${ts.files} out of ${totFiles} tests)`;
console.log(out);
process.exit(1);
