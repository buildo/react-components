// import Meter from 'buildo-react-components/lib/Meter';

class Example extends React.Component {
  render() {

    const ranges = [
      { startValue: 40, endValue: 60, fillingColor: '#34aa44', labelColor: '#34aa44' },
    ];

    const meterProps = {
      ranges,
      baseFillingColor: '#CCCCCC',
      baseBackgroundColor: '#FAFAFA',
      style: { marginBottom: 20 }
    }

    return (
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
    );
  }
}
