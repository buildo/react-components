class Example extends React.Component {

  state = { isOpen: false }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  getModal = () => (
    <Modal
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      onDismiss={this.close}
      iconClose={<Icon icon='close' />}
      title='Informative Modal'
    >
      This modal contains just info. So it is not possible to perform an action.
    </Modal>
  )

  render = () => (
    <div>
      <Button default onClick={this.open}>Open modal</Button>
      {this.state.isOpen && this.getModal()}
    </div>
  )
}
