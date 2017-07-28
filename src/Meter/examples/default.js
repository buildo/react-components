// import Meter from 'buildo-react-components/lib/Meter';

class Example extends React.Component {

  render() {

    const ranges = [
      { startValue: 0, endValue: 30, fillingColor: '#ed1c24', labelColor: '#ed1c24', backgroundColor: '#feeced' },
      { startValue: 30, endValue: 70, fillingColor: '#fdc018', labelColor: '#fdc018' },
      { startValue: 70, endValue: 100, fillingColor: '#34aa44', labelColor: '#34aa44' }
    ];

    const meterProps = {
      ranges,
      style: { marginBottom: 20 }
    };

    return (
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
    );
  }

}
