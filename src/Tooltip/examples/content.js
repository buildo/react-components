class Example extends React.Component {

  render() {
    const popover = {
      position: 'top',
      anchor: 'start',
      style: { width: 207, textAlign: 'left' },
      content: (
        <div className='avatar-tooltip' style={{ padding: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(white, 0.9)' }}>Charlotte</div>
          <div style={{ fontSize: 13, color: 'rgba(white, 0.6)' }}>Sed posuere consectetur est at lob ortis. Aenean eu leo quam. Pellentesque ornare sem lacinia.</div>
        </div>
      )
    };

    return (
      <FlexView>
        <Tooltip popover={popover} size='small'>
          <img src='../../src/Tooltip/examples/avatar.png' alt='Charlotte' />
        </Tooltip>
      </FlexView>
    );
  }

}
