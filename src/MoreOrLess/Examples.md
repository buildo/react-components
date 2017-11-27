### Examples

```js
initialState = { expanded: false }

function onExpandedChange() {
  setState({ expanded: !state.expanded })
}

const templateExpanded = () => (
  <FlexView className='card'>
    <FlexView grow shrink className='description'>
      <FlexView column>
        <FlexView className='title'>The Student Hotel</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>Taylor Cambell</FlexView>
          <FlexView className='date'>7th of March</FlexView>
        </FlexView>
        What is boutique hotel design, and why does it
        matter? There are fashion trends in hotel design just
        as there are in other areas. In the late eighties and
        through the nineties, that fashion was for clean, stark,
        minimalist design, particularly in city hotels. This was
        such a diversion from the traditional way.
      </FlexView>
    </FlexView>
    <FlexView grow shrink={false} hAlignContent='right'>
      <img src='moreOrLess.png' />
    </FlexView>
  </FlexView>
);

const templateCollapsed = () => (
  <FlexView className='card' style={{ maxHeight: 116 }}>
    <FlexView className='description'>
      <FlexView column>
        <FlexView className='title'>The Student Hotel</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>Taylor Cambell</FlexView>
          <FlexView className='date'>7th of March</FlexView>
        </FlexView>
      </FlexView>
    </FlexView>
    <FlexView grow hAlignContent='right' vAlignContent='center'>
      <img src='moreOrLess2.png' style={{ width: 'auto', height: 80 }} />
    </FlexView>
  </FlexView>
);


const { expanded } = state;
const icons = { expanded: 'angleUpsvg', collapsed: 'angleDown' };

<MoreOrLess {...{ expanded, onExpandedChange, icons }}>
  { expanded ? templateExpanded() : templateCollapsed()}
</MoreOrLess>
```
