class Example extends React.Component {

  onClick = () => alert('clicked!');

  render = () => {

    const buttonProps = {
      onClick: this.onClick,
      style: { margin: 10, width: 150 }
    };

    return (
      <FlexView style={{ lineHeight: '80px' }}>
        <Button label='Tiny button' size='tiny' {...buttonProps} />
        <Button label='Small button' size='small' {...buttonProps} />
        <Button label='Medium button' {...buttonProps} />
      </FlexView>
    );
  }
}
