### Examples

`Overflow` will automatically render the node passed through `contentIfOverflowing` whenever the original `content` overflows its parent.

```js
const getContent = isOverflowing => (
  <FlexView
    width={700}
    vAlignContent="center"
    style={{
      color: 'white',
      background: isOverflowing ? '#d1236d' : '#1a91eb',
      padding: 10
    }}
  >
    Is overflowing: {String(isOverflowing)}
  </FlexView>
);

<FlexView style={{ background: '#f0f3f8', borderRadius: 3, overflow: 'hidden' }}>
  <Overflow content={getContent(false)} contentIfOverflowing={getContent(true)} />
</FlexView>;
```
