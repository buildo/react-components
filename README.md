[![](https://travis-ci.org/buildo/react-components.svg?branch=master)](https://travis-ci.org/buildo/react-components)

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
