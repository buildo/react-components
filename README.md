#React Components
This is a collection of every reusable React component used in [Buildo](http://buildo.io/).

Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized.

###Install
```npm install --save buildo-react-components```

###Usage
Each component is stored inside its own folder (useful for small bundles).
You can import each package directly from the main lib:

`import { FlexView, Dropdown, DatePicker } from 'buildo-react-components';`

Or from the package folder:

`import { DatePickerInput } from 'buildo-react-components/lib/datepicker';`

###Components
[Kitchen Sink](https://rawgit.com/buildo/react-components/master/kitchen-sink/index.html)

|folder name|based on (if any)|
| ---------------- | ------------- |
|[datepicker](https://github.com/buildo/react-components/tree/master/src/datepicker)|rc-datepicker|
|[cookie-banner](https://github.com/buildo/react-components/tree/master/src/cookie-banner)|react-cookie-banner|
|[input-link](https://github.com/buildo/react-components/tree/master/src/input-link)|react-input-link|
|[textarea-autosize](https://github.com/buildo/react-components/tree/master/src/textarea-autosize)|react-autosize-textarea|
|[dropdown](https://github.com/buildo/react-components/tree/master/src/dropdown)|react-select|
|[popover](https://github.com/buildo/react-components/tree/master/src/popover)|X|
|[flex](https://github.com/buildo/react-components/tree/master/src/flex)|X|
|[loading-spinner](https://github.com/buildo/react-components/tree/master/src/loading-spinner)|X|
