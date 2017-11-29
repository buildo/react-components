### Examples

#### A typical usage

```js
initialState = { state: 'ready' }

const labels = {
  success: 'Success',
  error: 'Error',
  ready: 'Ready',
  processing: 'Processing'
}

const icons = {
  success: <Icon icon='check2' />,
  error: <Icon icon='x' />,
  processing: <LoadingSpinner size='1em' overlayColor='transparent' />
}

function onClick() {
  if (!this.timeout) {
    setState({ state: 'processing'});

    this.timeout = setTimeout(() => {
      setState({ state: Math.random() > .5 ? 'success' : 'error'});
      this.timeout = setTimeout(() => {
        setState({ state: 'ready' });
        clearTimeout(this.timeout);
        this.timeout = null;
      }, 1987);
    }, 1987);
  }
}

<FlexView>

  <FlexView marginRight={30}>
    <Button buttonState='ready' onClick={onClick}>click!</Button>
  </FlexView>

  <FlexView>
    <AsyncStatusIndicator
      state={state.state}
      icons={icons}
      labels={labels}
    />
  </FlexView>

</FlexView>
```

#### All the states

```js
const labels = {
  success: 'Success',
  error: 'Error',
  ready: 'Ready',
  processing: 'Processing'
};

const icons = {
  success: <Icon icon='check2' />,
  error: <Icon icon='x' />,
  processing: <LoadingSpinner size='1em' overlayColor='transparent' />
};

<FlexView column>

  <FlexView height={50}>
    <AsyncStatusIndicator
      state='ready'
      icons={icons}
      labels={labels}
    />
  </FlexView>

  <FlexView height={50}>
    <AsyncStatusIndicator
      state='processing'
      icons={icons}
      labels={labels}
    />
  </FlexView>

  <FlexView height={50}>
    <AsyncStatusIndicator
      state='success'
      icons={icons}
      labels={labels}
    />
  </FlexView>

  <FlexView height={50}>
    <AsyncStatusIndicator
      state='error'
      icons={icons}
      labels={labels}
    />
  </FlexView>

</FlexView>
```
