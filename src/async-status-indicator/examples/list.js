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
  );

}
