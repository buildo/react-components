class Example extends React.Component {

  getContent = (focused) => (
    <FlexView
      grow
      height={50}
      style={{ border: focused ? '1px solid blue' : undefined, backgroundColor: 'lightgray' }}
    />
  );

  render = () => (
    <FocusableView component={FlexView} style={{ outline: 'none' }}>
      {this.getContent}
    </FocusableView>
  );

}
