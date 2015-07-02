[![codecov.io](http://codecov.io/github/buildo/web-lib-seed/coverage.svg?branch=master)](http://codecov.io/github/buildo/web-lib-seed?branch=master)

**development**

- `npm test`: run tests (files placed in `test/tests` are included)
- `npm run lint`: run `eslint`

**publishing to npm**

- `npm version`: bump version, `preversion` also runs `lint` and `test`
- `npm publish`: publish the updated version to npm, `prepublish` also runs `build`
