class Example extends React.Component {
  constructor() {
    super();
    this.state = { isOpen: true };
  }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  getModal = () => (
    <Modal
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      onDismiss={this.close}
      iconClose={<Icon icon='close' />}
    >
      <button>My button</button>
    </Modal>
  )

  render = () => (
    <div>
      <button onClick={this.open}>Open modal</button>
      {this.state.isOpen && this.getModal()}
    </div>
  )
}
