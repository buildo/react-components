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
}

class Example extends React.Component {

  state = { state: 'ready' }

  onClick = () => {
    if (this.timeout) {
      return;
    }
    this.setState({ state: 'processing'});
    this.timeout = setTimeout(() => {
      this.setState({ state: Math.random() > .5 ? 'success' : 'error'});
      this.timeout = setTimeout(() => {
        this.setState({ state: 'ready' });
        clearTimeout(this.timeout);
      }, 1987);
    }, 1987);
  }

  render = () => (
    <FlexView>

      <FlexView marginRight={30}>
        <button onClick={this.onClick}>click!</button>
      </FlexView>

      <FlexView>
        <AsyncStatusIndicator
          state={this.state.state}
          icons={icons}
          labels={labels}
        />
      </FlexView>

    </FlexView>
  );

}
