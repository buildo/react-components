class Example extends React.Component {

  render() {
    return (
      <FlexView style={{ maxHeight: 100 }} column>
        <ScrollView>
          <img alt='scrollscroll' style={{ height: 200, width: '100%' }} src='https://media.giphy.com/media/26BRERwHtgJTf7rTG/giphy.gif' />
        </ScrollView>
      </FlexView>
    );
  }

}
