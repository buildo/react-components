class Example extends React.Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  getModal = () => (
    <Modal
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      onDismiss={this.close}
      iconClose={<Icon icon='close' />}
      title='Send Message'
      footer={
        <FlexView hAlignContent='right'>
          <Button default size='small' style={{ marginRight: 10 }} onClick={this.close}>Cancel</Button>
          <Button primary size='small' onClick={this.close}>Confirm</Button>
        </FlexView>
      }
    >
      Are you sure you want to send this message?
    </Modal>
  )

  render = () => (
    <div>
      <Button default onClick={this.open}>Open modal</Button>
      {this.state.isOpen && this.getModal()}
    </div>
  )
}
