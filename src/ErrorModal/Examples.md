### Examples

```js
intialState = { isOpen: false };

function open() {
  setState({ isOpen: true });
}

function close() {
  setState({ isOpen: false });
}

const closeIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="12"
    viewBox="0 0 22 28"
  >
    <path
      fill="#9098a7"
      d="M20.281 20.656q0 0.625-0.438 1.062l-2.125 2.125q-0.438 0.438-1.062 0.438t-1.062-0.438l-4.594-4.594-4.594 4.594q-0.438 0.438-1.062 0.438t-1.062-0.438l-2.125-2.125q-0.438-0.438-0.438-1.062t0.438-1.062l4.594-4.594-4.594-4.594q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.594 4.594-4.594q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.438 0.438 1.062t-0.438 1.062l-4.594 4.594 4.594 4.594q0.438 0.438 0.438 1.062z"
    />
  </svg>
);

const getModal = () => (
  <ErrorModal
    onDismiss={close}
    title="Something went wrong!"
    message="Close this modal and ignore, this is just a demo ;)"
    iconClose={closeIcon}
  />
);

<div>
  <Button onClick={open}>Open error modal</Button>
  {state.isOpen && getModal()}
</div>;
```
