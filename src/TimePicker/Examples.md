### Examples

#### 12h time format

```js
const [state, setState] = React.useState({});

function onChange(value) {
  setState({ value });
}

<TimePicker value={state.value} onChange={onChange} timeFormat="12h" />;
```

#### 24h time format (bounded range)

```js
const [state, setState] = React.useState({ value: { hours: 11, minutes: 23 }}});

const minTime = { hours: 8, minutes: 30 };
const maxTime = { hours: 18, minutes: 30 };

function onChange(value) {
  setState({ value });
}

<TimePicker
  value={state.value}
  minTime={minTime}
  maxTime={maxTime}
  onChange={onChange}
  timeFormat="24h"
/>;
```
