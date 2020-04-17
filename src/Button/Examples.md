### Examples

```js
const onClick = () =>
  new Promise((resolve, reject) => {
    const headsOrTails = () => Math.random() > 0.5;
    const resolveOrReject = () => {
      const _headsOrTails = headsOrTails();
      _headsOrTails ? resolve() : reject();
    };
    setTimeout(resolveOrReject, 500);
  });

<StatefulButton baseState="ready" label="Button label" onClick={onClick} style={{ width: 150 }} />;
```

#### Async buttons

This variant can be applied to default, primary, positive and flat buttons.

```js
function onClick() {
  alert('clicked!');
}

const buttonProps = {
  onClick,
  style: { margin: 10, width: 150 }
};

<FlexView>
  <Button label="Processing" buttonState="processing" {...buttonProps} />
  <Button label="Success" buttonState="success" {...buttonProps} />
  <Button label="Error" buttonState="error" {...buttonProps} />
</FlexView>;
```

#### Fluid button

Block buttons typically occupy all the horizontal space available in its container. There should be only 1 button on the same line, if more than one block button is present they are stacked vertically.

```js
function onClick() {
  alert('clicked!');
}

<Button fluid label="Fluid button" onClick={onClick} />;
```

#### Button Sizes

There are 3 possible button sizes:

```js
function onClick() {
  alert('clicked!');
}

const buttonProps = {
  onClick,
  style: { margin: 10, width: 150 }
};

<FlexView style={{ lineHeight: '80px' }}>
  <Button label="Tiny button" size="tiny" {...buttonProps} />
  <Button label="Small button" size="small" {...buttonProps} />
  <Button label="Medium button" {...buttonProps} />
</FlexView>;
```

#### Type of buttons

A button can be formatted to show different levels of emphasis. We have 6 types of buttons:

```js
function onClick() {
  alert('clicked!');
}

const buttonProps = {
  onClick,
  style: { margin: 10, width: 150 }
};

<FlexView style={{ lineHeight: '80px' }} wrap>
  <Button label="Default button" {...buttonProps} />
  <Button label="Primary button" primary {...buttonProps} />
  <Button label="Positive button" type="positive" {...buttonProps} />
  <Button label="Negative button" type="negative" {...buttonProps} />
  <Button label="Flat button" flat {...buttonProps} />
  <Button label="Icon button" icon="to-do" {...buttonProps} />
</FlexView>;
```
