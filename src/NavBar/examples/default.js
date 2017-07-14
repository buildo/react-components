class Example extends React.Component {

  left = () => <FlexView className='left'>
    <a className='item active'>Home</a>
    <a className='item'>Discover</a>
    <a className='item'>Messages</a>
  </FlexView>;

  right = () => <Button primary size='small' icon='plus' label='New Project' onClick={() => {}} />;

  render() {
    const props = {
      content: {
        left: this.left(),
        right: this.right()
      },
      background: 'white',
      height: 80
    };

    return <NavBar {...props} />;
  }
}
