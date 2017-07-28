// import TextOverflow from 'buildo-react-components/lib/TextOverflow';

class Example extends React.Component {

  render() {
    const label = 'This is a long text that should overflow';
    return (
      <FlexView style={{ maxWidth: 150 }}>
        <TextOverflow label={label}>
          {(self) => (
            <Tooltip popover={{ content: label }} style={{ width: '100%' }}>
              {self}
            </Tooltip>
          )}
        </TextOverflow>
      </FlexView>
    );
  }

}
