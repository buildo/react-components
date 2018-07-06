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
  success: (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <path fill='#39b54a' d="M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z"></path>
    </svg>
  ),
  error: (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <path fill='#fb242c' d="M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z"></path>
    </svg>
  ),
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
  success: (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <path fill='#39b54a' d="M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z"></path>
    </svg>
  ),
  error: (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <path fill='#fb242c' d="M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z"></path>
    </svg>
  ),
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
