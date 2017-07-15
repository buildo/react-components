class Example extends React.Component {

  render() {
    const label = 'Resize the browser to trigger TextOverflow';
    return (
      <TextOverflow label={label} style={{ color: '#1a91eb' }}>
        {(self) => (
          <div>
            <Tooltip popover={{ content: label }} style={{ width: '100%', color: '#d1236d' }}>
              {self}
            </Tooltip>
          </div>
        )}
      </TextOverflow>
    );
  }

}
