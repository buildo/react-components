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

  render = () => (
    <AsyncStatusIndicator
      state='processing'
      icons={icons}
      labels={labels}
    />
  );

}
