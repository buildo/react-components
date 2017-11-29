### Examples

```js
const getContent = (focused) => (
  <FlexView
    grow
    height={50}
    style={{
      cursor: 'pointer',
      border: focused ? '1px solid #1a91eb' : '1px solid #ced0da',
      backgroundColor: '#f0f3f8'
    }}
  />
);

<FocusableView component={FlexView} style={{ outline: 'none' }}>
  {getContent}
</FocusableView>
```
