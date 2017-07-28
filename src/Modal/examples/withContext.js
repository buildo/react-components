// import { modalWithContext } from 'buildo-react-components/lib/Modal';

const FooType = React.PropTypes.string.isRequired;

const ModalWithContext = modalWithContext({ foo: FooType });

class ComponentAccessingContext extends React.Component {
  static contextTypes = {
    foo: FooType
  };

  render() {
    return <div>{this.context.foo}</div>;
  }
}

class Example extends React.Component {
  static childContextTypes = {
    foo: FooType
  };

  getChildContext = () => ({
    foo: 'this comes from context!'
  });

  state = { isOpen: false };

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  getModal = () => (
    <ModalWithContext
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
      <ComponentAccessingContext />
    </ModalWithContext>
  )

  render = () => (
    <div>
      <Button default onClick={this.open}>Open modal</Button>
      {this.state.isOpen && this.getModal()}
    </div>
  )
}
