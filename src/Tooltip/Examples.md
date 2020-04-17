### Examples

```js
const popover = {
  position: 'bottom',
  anchor: 'center',
  content: 'Tooltip content'
};

<Tooltip popover={popover}>
  <span>Hover me!</span>
</Tooltip>;
```

#### Size

Tooltip comes in two different sizes

```js
const popover = {
  position: 'bottom',
  anchor: 'center',
  content: 'Tooltip content',
  isOpen: true
};

<FlexView style={{ paddingBottom: 100 }}>
  <Tooltip popover={popover} size="small">
    <span>Small tooltip!</span>
  </Tooltip>
  <Divider size="large" orientation="horizontal" />
  <Tooltip popover={popover} size="big">
    <span style={{ fontSize: 16 }}>Big tooltip!</span>
  </Tooltip>
</FlexView>;
```

#### Positions

You can also set the position ('top', 'bottom', 'left', 'right') and the anchor point ('start', 'center', 'end') of the tooltip:

```js
const tooltipProps = { style: { marginRight: 30 } };
const commonPopoverProps = { content: 'Tooltip', isOpen: true };

<FlexView column>
  <FlexView style={{ marginTop: 40, marginBottom: 70 }}>
    <Tooltip {...tooltipProps} popover={{ anchor: 'start', ...commonPopoverProps }}>
      <span>Anchor: start</span>
    </Tooltip>
    <Tooltip {...tooltipProps} popover={{ anchor: 'center', ...commonPopoverProps }}>
      <span>Anchor: center</span>
    </Tooltip>
    <Tooltip {...tooltipProps} popover={{ anchor: 'end', ...commonPopoverProps }}>
      <span>Anchor: end</span>
    </Tooltip>
  </FlexView>

  <FlexView>
    <FlexView style={{ marginRight: 30 }}>
      <Tooltip {...tooltipProps} popover={{ position: 'top', ...commonPopoverProps }}>
        <span>Position: top</span>
      </Tooltip>
      <Tooltip
        {...tooltipProps}
        style={{ marginTop: -40 }}
        popover={{ position: 'bottom', offsetY: -40, ...commonPopoverProps }}
      >
        <span>Position: bottom</span>
      </Tooltip>
    </FlexView>
    <FlexView column style={{ marginTop: -40 }}>
      <Tooltip popover={{ position: 'right', offsetX: -60, ...commonPopoverProps }}>
        <span>Position: right</span>
      </Tooltip>
      <Tooltip
        style={{ marginTop: 20, marginLeft: 70 }}
        popover={{ position: 'left', ...commonPopoverProps }}
      >
        <span>Position: left</span>
      </Tooltip>
    </FlexView>
  </FlexView>
</FlexView>;
```

#### Trigger events

By default, the tooltip is triggered when the mouse moves over the wrapped component. Using the `isOpen` prop you can also decide to manually control when the tooltip should appear:

```js
initialState = { isOpen: false };

onClick = () => {
  setState({ isOpen: !state.isOpen });
};

const popover = {
  position: 'top',
  anchor: 'center',
  content: 'Tooltip content'
};

const { isOpen } = state;

<FlexView vAlignContent="center">
  <Tooltip popover={popover}>
    <span>Hover me!</span>
  </Tooltip>
  <Divider size="large" orientation="horizontal" />
  <Tooltip popover={{ ...popover, isOpen }}>
    <Button flat size="tiny" onClick={onClick} label="Click me!" />
  </Tooltip>
</FlexView>;
```
