class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  onActionClick = () => alert('clicked action')

  render() {
    const options = [
      {
        title: 'Action 1',
        type: 'item',
        onClick: this.onActionClick
      },
      {
        title: 'Action 2',
        type: 'item',
        onClick: this.onActionClick
      }
    ];

    const dropdownMenuProps = {
      className: 'profile-menu',
      onOpen: this.toggleOpen,
      onClose: this.toggleOpen,
      isOpen: this.state.isOpen,
      options
    };

    return (
      <FlexView hAlignContent="right">
        <DropdownMenu {...dropdownMenuProps}>
          <FlexView grow vAlignContent="center" hAlignContent="right">
            <span>Mr. Example</span>
            <Icon icon='angle-down' style={{ marginLeft: 5, cursor: 'pointer' }} />
          </FlexView>
        </DropdownMenu>
      </FlexView>
    );
  }
}
