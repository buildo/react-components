### Examples

#### Triggering on hover

```js
const Item = ({ title, value }) => (
  <FlexView column hAlignContent='center' className='option'>
    <FlexView className='title'>{title}</FlexView>
    <FlexView className='value'>{`$${value}/month`}</FlexView>
    <Button size='medium' label='Choose' onClick={() => {}} />
  </FlexView>
);

const content = (
  <FlexView>
    <Item title='Express' value={9} />
    <Item title='Premium' value={12} />
    <Item title='Enterprise' value={22} />
  </FlexView>
);

const popoverProps = {
  content,
  position: 'top',
  anchor: 'start',
  event: 'hover',
  className: 'baloon',
  delay: { whenOpen: 100 }
};


<Popover popover={popoverProps}>
  <FlexView hAlignContent='center' style={{ width: 150, border: '1px solid #dedede', padding: 10 }}>
    Hover me!
  </FlexView>
</Popover>
```

#### Triggering on click

```js
const Item = ({ title, image }) => (
  <FlexView column hAlignContent='center' className='option'>
    <img src={`${image}.png`} />
    <Button size='medium' label={title} onClick={() => {}} />
  </FlexView>
);

const content = (
  <FlexView>
    <Item title='Spider-Man' image='avatarPopover1' />
    <Item title='Iron Man' image='avatarPopover2' />
    <Item title='Daredevil' image='avatarPopover3' />
  </FlexView>
);

const popoverProps = {
  content,
  position: 'top',
  anchor: 'start',
  dismissOnClickOutside: true,
  dismissOnScroll: true,
  event: 'click',
  className: 'baloon'
};

<Popover popover={popoverProps}>
  <FlexView hAlignContent='center' style={{ width: 150, border: '1px solid #dedede', padding: 10, cursor: 'pointer' }}>
    Click me!
  </FlexView>
</Popover>
```

#### Auto positionment

```js
const Item = ({ title, value }) => (
  <FlexView column hAlignContent='center' className='option'>
    <FlexView className='title'>{title}</FlexView>
    <FlexView className='value'>{`$${value}/month`}</FlexView>
    <Button size='medium' label='Choose' onClick={() => {}} />
  </FlexView>
);

const content = (
  <FlexView>
    <Item title='Express' value={9} />
    <Item title='Premium' value={12} />
    <Item title='Enterprise' value={22} />
  </FlexView>
);

const popoverProps = {
  content,
  attachToBody: true,
  auto: true,
  position: 'top',
  anchor: 'center',
  event: 'hover',
  className: 'baloon',
  delay: { whenOpen: 100 }
};

<Popover popover={popoverProps}>
  <FlexView hAlignContent='center' style={{ width: 150, border: '1px solid #dedede', padding: 10 }}>Hover me!</FlexView>
</Popover>
```
