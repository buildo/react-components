class Example extends React.Component {

  render() {
    const label = 'Resize the browser to trigger TextOverflow';
    return (
      <TextOverflow style={{ color: 'blue' }} label={label}>
        {(self) => (
          <Popover popover={{ content: label }} style={{ color: 'red', width: '100%' }}>
            {self}
          </Popover>
        )}
      </TextOverflow>
    );
  }

}
