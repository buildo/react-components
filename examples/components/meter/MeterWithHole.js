class Example extends React.Component {
  render() {
    const ranges = [
      { startValue: 30, endValue: 50, fillingColor: 'blue', labelColor: 'blue' },
    ];
    return (
      <div>
        <div style={{minHeigth: 10}}>
          <Meter
            value={20}
            baseFillingColor={'#ccc'}
            ranges={ranges}
          />
        </div>
        <br/>
        <div style={{minHeigth: 10}}>
          <Meter
            value={40}
            ranges={ranges}
          />
        </div>
        <br/>
        <div style={{minHeigth: 10}}>
          <Meter
            value={60}
            baseFillingColor={'#ccc'}
            baseBackgroundColor={'#eee'}
            ranges={ranges}
          />
        </div>
      </div>
    );
  }
}
