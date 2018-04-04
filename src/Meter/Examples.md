### Examples

You can customize the style (colors) of Meter based on the range in which the current value falls

```js
const ranges = [
  { startValue: 0, endValue: 30, fillingColor: '#ed1c24', labelColor: '#ed1c24', backgroundColor: '#feeced' },
  { startValue: 30, endValue: 70, fillingColor: '#fdc018', labelColor: '#fdc018' },
  { startValue: 70, endValue: 100, fillingColor: '#34aa44', labelColor: '#34aa44' }
];

const meterProps = {
  ranges,
  baseBackgroundColor: '#f8f8f8',
  style: { marginBottom: 20 }
};

<FlexView width='100%' column>
  <Meter
    {...meterProps}
    value={30}
  />
  <Meter
    {...meterProps}
    value={45}
  />
  <Meter
    {...meterProps}
    value={100}
  />
</FlexView>
```

Ranges could also have holes between them. If the current value doesn't fall in any of the given ranges, it will use a base style you can configure as you like:

```js
const ranges = [
  { startValue: 40, endValue: 60, fillingColor: '#34aa44', labelColor: '#34aa44' },
];

const meterProps = {
  ranges,
  baseFillingColor: '#CCCCCC',
  baseBackgroundColor: '#F8F8F8',
  style: { marginBottom: 20 }
};

<FlexView column>
  <Meter
    {...meterProps}
    value={20}
  />
  <Meter
    {...meterProps}
    value={50}
  />
  <Meter
    {...meterProps}
    value={80}
  />
</FlexView>
```

#### Custom labels
By default, Meter display an auto-calculated percentage next to the bar. You can customize your own label formatter in order to show whathever you like:

```js
function labelFormatter1(curr, min, max) {
  return +(Math.round(curr + 'e+2')  + 'e-2');
};

function labelFormatter2(curr, min, max) {
  return `${curr}/${max}`;
}

function labelFormatter3(curr, min, max) {
  return curr > (max - min) / 2 ? 'good' : 'bad';
}

const ranges = [
  { startValue: 400, endValue: 665, fillingColor: '#34aa44', labelColor: '#34aa44' },
  { startValue: 665, endValue: 667, fillingColor: '#ed1c24', labelColor: '#ed1c24' },
  { startValue: 667, endValue: 700, fillingColor: '#fdc018', labelColor: '#fdc018' }
];

const meterProps = {
  min: 400,
  max: 700,
  ranges,
  baseBackgroundColor: '#f8f8f8',
  style: { marginBottom: 20 }
};

<FlexView column>
  <Meter
    {...meterProps}
    value={432.315}
    labelFormatter={labelFormatter1}
  />
  <Meter
    {...meterProps}
    value={666}
    labelFormatter={labelFormatter2}
  />
  <Meter
    {...meterProps}
    value={690}
    labelFormatter={labelFormatter3}
  />
</FlexView>
```
