### Examples

```js
const left = () => (
  <FlexView className="left">
    <a className="item active">Home</a>
    <a className="item">Discover</a>
    <a className="item">Messages</a>
  </FlexView>
);

const right = () => (
  <Button primary size="small" icon="plus" label="New Project" onClick={() => {}} />
);

const props = {
  content: {
    left: left(),
    right: right()
  },
  background: 'white',
  height: 80
};

<NavBar {...props} />;
```
