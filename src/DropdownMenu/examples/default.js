class Example extends React.Component {

  state = { isOpen: false };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  onClick = (option) => alert(`${option.title} clicked`)

  render() {

    const { toggleOpen, onClick, state: { isOpen } } = this;

    const options = [
      {
        title: 'Preferences',
        type: 'item',
        onClick
      },
      {
        title: 'Change password',
        type: 'item',
        onClick
      },
      {
        title: 'Logout',
        type: 'item',
        onClick
      }
    ];

    const dropdownMenuProps = {
      onOpen: toggleOpen,
      onClose: toggleOpen,
      isOpen,
      options
    };

    const icon = isOpen ? 'angleUpsvg' : 'angleDown';

    return (
      <FlexView hAlignContent='right' style={{ border: '1px solid #ced0da' }}>
        <DropdownMenu {...dropdownMenuProps}>
          <FlexView vAlignContent='center' className='user-menu'>
            <FlexView shrink={false} className='user-avatar'>
              <img src='../../src/DropdownMenu/examples/avatar.png' />
            </FlexView>
            <FlexView column grow>
              <FlexView className='user-name'>Jordan J.</FlexView>
              <FlexView className='user-role'>Administrator</FlexView>
            </FlexView>
            <FlexView shrink={false}>
              <Icon icon={icon} style={{ cursor: 'pointer' }} />
            </FlexView>
          </FlexView>
        </DropdownMenu>
      </FlexView>
    );
  }
}
