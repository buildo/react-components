// import Tooltip from 'buildo-react-components/lib/Tooltip';

class Example extends React.Component {

  state = { isOpen: false }

  onClick = () => { this.setState({ isOpen: !this.state.isOpen }); }

  render() {

    const popover = {
      position: 'top',
      anchor: 'center',
      content: 'Tooltip content'
    };

    const { onClick, state: { isOpen } } = this;

    return (
      <FlexView vAlignContent='center'>
        <Tooltip popover={popover}>
          <span>Hover me!</span>
        </Tooltip>
        <Divider size='large' orientation='horizontal' />
        <Tooltip popover={{ ...popover, isOpen }}>
          <Button flat size='tiny' onClick={onClick} label='Click me!' />
        </Tooltip>
      </FlexView>
    );
  }

}
