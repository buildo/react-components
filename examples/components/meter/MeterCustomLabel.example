class Example extends React.Component {

  labelFormatter = (curr, min, max) => {
    if (curr === 666){
      return `${curr}(Evil!)`;
    }
    return +(Math.round(curr + "e+2")  + "e-2");
  };

  render() {
    const ranges = [
      { startValue: 400, endValue: 665, fillingColor: 'green', labelColor: 'blue' },
      { startValue: 666, endValue: 667, fillingColor: 'red', labelColor: 'red' },
      { startValue: 667, endValue: 700, fillingColor: 'blue', labelColor: 'green' }
    ];
    return (
      <div>
        <div style={{minHeigth: 10}}>
          <Meter
            value={432.315}
            min={400}
            max={700}
            labelFormatter={this.labelFormatter}
            baseFillingColor={'#ccc'}
            ranges={ranges}
          />
        </div>
        <br/>
        <div style={{minHeigth: 10}}>
          <Meter
            value={666}
            min={400}
            max={700}
            labelFormatter={this.labelFormatter}
            baseFillingColor={'#ccc'}
            ranges={ranges}
          />
        </div>
        <br/>
        <div style={{minHeigth: 10}}>
          <Meter
            value={690}
            min={400}
            max={700}
            labelFormatter={this.labelFormatter}
            baseFillingColor={'#ccc'}
            ranges={ranges}
          />
        </div>
      </div>
    );
  }
}
