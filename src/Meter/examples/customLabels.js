class Example extends React.Component {

  labelFormatter1 = (curr, min, max) => {
    return +(Math.round(curr + 'e+2')  + 'e-2');
  };

  labelFormatter2 = (curr, min, max) => {
    return `${curr}/${max}`;
  }

  labelFormatter3 = (curr, min, max) => {
    return curr > (max - min) / 2 ? 'good' : 'bad';
  }

  render() {

    const ranges = [
      { startValue: 400, endValue: 665, fillingColor: '#34aa44', labelColor: '#34aa44' },
      { startValue: 665, endValue: 667, fillingColor: '#ed1c24', labelColor: '#ed1c24' },
      { startValue: 667, endValue: 700, fillingColor: '#fdc018', labelColor: '#fdc018' }
    ];

    const meterProps = {
      min: 400,
      max: 700,
      ranges,
      style: { marginBottom: 20 }
    };

    return (
      <FlexView column>
        <Meter
          {...meterProps}
          value={432.315}
          labelFormatter={this.labelFormatter1}
        />
        <Meter
          {...meterProps}
          value={666}
          labelFormatter={this.labelFormatter2}
        />
        <Meter
          {...meterProps}
          value={690}
          labelFormatter={this.labelFormatter3}
        />
      </FlexView>
    );
  }
}
