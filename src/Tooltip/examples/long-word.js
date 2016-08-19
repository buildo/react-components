class Example extends React.Component {

  render() {
    const popover = {
      position: 'bottom',
      anchor: 'center',
      content: 'Thisisthelongestwordyouhaveeverseeninthewholeworld!'
    }
    return (
      <Tooltip popover={popover}>
        <span>Hover me!</span>
      </Tooltip>
    );
  }

}
