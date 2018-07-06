### Examples

```js
intialState = { isOpen: false };

function open() {
  setState({ isOpen: true })
}

function close() {
  setState({ isOpen: false })
}

const closeIcon = (
  <svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='12' viewBox='0 0 22 28'>
    <path fill='#9098a7' d='M20.281 20.656q0 0.625-0.438 1.062l-2.125 2.125q-0.438 0.438-1.062 0.438t-1.062-0.438l-4.594-4.594-4.594 4.594q-0.438 0.438-1.062 0.438t-1.062-0.438l-2.125-2.125q-0.438-0.438-0.438-1.062t0.438-1.062l4.594-4.594-4.594-4.594q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.594 4.594-4.594q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.438 0.438 1.062t-0.438 1.062l-4.594 4.594 4.594 4.594q0.438 0.438 0.438 1.062z'></path>
  </svg>
);

const getModal = () => (
  <Modal
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
    onDismiss={close}
    iconClose={closeIcon}
    title='Send Message'
    footer={
      <FlexView hAlignContent='right'>
        <Button size='small' style={{ marginRight: 10 }} onClick={close}>Cancel</Button>
        <Button primary size='small' onClick={close}>Confirm</Button>
      </FlexView>
    }
  >
    Are you sure you want to send this message?
  </Modal>
);

<div>
  <Button onClick={open}>Open modal</Button>
  {state.isOpen && getModal()}
</div>
```


#### Modal without header

```js
intialState = { isOpen: false };

function open() {
  setState({ isOpen: true })
}

function close() {
  setState({ isOpen: false })
}

const getModal = () => (
  <Modal
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
    onDismiss={close}
    footer={
      <FlexView hAlignContent='right'>
        <Button size='small' style={{ marginRight: 10 }} onClick={close}>Cancel</Button>
        <Button primary size='small' onClick={close}>Confirm</Button>
      </FlexView>
    }
  >
    Are you sure you want to send this message?
  </Modal>
);

<div>
  <Button onClick={open}>Open modal</Button>
  {state.isOpen && getModal()}
</div>
```


#### Modal without footer

```js
intialState = { isOpen: false };

function open() {
  setState({ isOpen: true })
}

function close() {
  setState({ isOpen: false })
}

const closeIcon = (
  <svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='12' viewBox='0 0 22 28'>
    <path fill='#9098a7' d='M20.281 20.656q0 0.625-0.438 1.062l-2.125 2.125q-0.438 0.438-1.062 0.438t-1.062-0.438l-4.594-4.594-4.594 4.594q-0.438 0.438-1.062 0.438t-1.062-0.438l-2.125-2.125q-0.438-0.438-0.438-1.062t0.438-1.062l4.594-4.594-4.594-4.594q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.594 4.594-4.594q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.438 0.438 1.062t-0.438 1.062l-4.594 4.594 4.594 4.594q0.438 0.438 0.438 1.062z'></path>
  </svg>
);

const getModal = () => (
  <Modal
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
    onDismiss={close}
    iconClose={closeIcon}
    title='Informative Modal'
  >
    This modal contains just info. So it is not possible to perform an action.
  </Modal>
);

<div>
  <Button onClick={open}>Open modal</Button>
  {state.isOpen && getModal()}
</div>
```


#### Passing arbitrary React context
Modal renders through a "portal", so React context is not propagated as expected.

*We know context isn't a public api, but it is required for [widely](https://github.com/reactjs/react-redux) [used](https://github.com/yahoo/react-intl) libraries to work. We also know there's `renderSubtreeIntoContainer`, which is unfortunately even more unstable.*

To solve this problem we export a handy `modalWithContext` that easily allows to pass context down correctly (look at the code!).

```js
const FooType = React.PropTypes.string.isRequired;
const closeIcon = (
  <svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='12' viewBox='0 0 22 28'>
    <path fill='#9098a7' d='M20.281 20.656q0 0.625-0.438 1.062l-2.125 2.125q-0.438 0.438-1.062 0.438t-1.062-0.438l-4.594-4.594-4.594 4.594q-0.438 0.438-1.062 0.438t-1.062-0.438l-2.125-2.125q-0.438-0.438-0.438-1.062t0.438-1.062l4.594-4.594-4.594-4.594q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.594 4.594-4.594q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.438 0.438 1.062t-0.438 1.062l-4.594 4.594 4.594 4.594q0.438 0.438 0.438 1.062z'></path>
  </svg>
);

const ModalWithContext = modalWithContext({ foo: FooType });

class ComponentAccessingContext extends React.Component {
  render() {
    return <div>{this.context.foo}</div>;
  }
}

ComponentAccessingContext.contextTypes = {
  foo: FooType
};

class Component extends React.Component {

  getChildContext() {
    return { foo: 'this comes from context!' };
  };

  constructor() {
    this.state = { isOpen: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ isOpen: true })
  }

  close() {
    this.setState({ isOpen: false })
  }

  getModal() {
    return (
      <ModalWithContext
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        onDismiss={this.close}
        iconClose={closeIcon}
        title='Send Message'
        footer={
          <FlexView hAlignContent='right'>
            <Button
              size='small'
              style={{ marginRight: 10 }}
              onClick={this.close}
            >
              Cancel
            </Button>
            <Button
              primary
              size='small'
              onClick={this.close}
            >
              Confirm
            </Button>
          </FlexView>
        }
      >
        <ComponentAccessingContext />
      </ModalWithContext>
    );
  }

  render() {
    return (
      <div>
        <Button onClick={this.open}>Open modal</Button>
        {this.state.isOpen && this.getModal()}
      </div>
    );
  }
}

Component.childContextTypes = {
  foo: FooType
};

<Component />
```
