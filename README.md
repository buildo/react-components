[![Build Status](https://drone.our.buildo.io/api/badges/buildo/react-components/status.svg)](https://drone.our.buildo.io/buildo/react-components) [![GitHub tag](https://img.shields.io/github/tag/buildo/react-components.svg)](https://github.com/buildo/react-components/releases)

# React Components
This is a collection of reusable React components used at [buildo](http://buildo.io/).

Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized.

### Install
```npm install --save buildo-react-components```

### Showroom
[http://buildo.github.io/react-components](http://buildo.github.io/react-components)

### Usage
Each component is stored inside its own folder (useful for small bundles).
You can import each package directly from the main lib:

`import { FlexView, Dropdown, Popover } from 'buildo-react-components';`

Or from the package folder:

`import { FlexView } from 'buildo-react-components/lib/flex';`

NOTE: If you installed it as a GitHub dependency (`npm i --save buildo/react-component`) then import from `/src`:

`import { FlexView } from 'buildo-react-components/src/flex';`

### Versioning guidelines
A new version of `b-r-c` is published every ~2 weeks with a github release containing a list of all the PRs merged on `master` since the previous one.
Each commit will marked as `Breaking`, `Fix`, `Feature`, `Docs`, `Build` (tests, examples, webpack...).
example of a release:
```
Breaking: title of the PR (issue #123)
Docs: title of the commit
```
To enforce this structure every commit merged on `master` should be already formatted that way. This means that before merging a PR the reviewer **must** format the merge commit.
