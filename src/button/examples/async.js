class Example extends React.Component {

  onClick = () => alert('clicked!');

  render = () => {

    const buttonProps = {
      onClick: this.onClick,
      style: { margin: 10, width: 150 },
      icon: {
        success: 'check',
        error: 'error'
      }
    };

    return (
      <FlexView>
        <Button label='Processing' buttonState='processing' {...buttonProps} />
        <Button label='Success' buttonState='success' {...buttonProps} />
        <Button label='Error' buttonState='error' {...buttonProps} />
      </FlexView>
    );
  }
}