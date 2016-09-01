class Example extends React.Component {

  onClick = () => alert('clicked!');

  render = () => {

    const buttonProps = {
      onClick: this.onClick,
      style: { margin: 10, width: 150 }
    };

    return (
      <FlexView style={{ lineHeight: '80px' }} wrap>
        <Button label='Default button' {...buttonProps} />
        <Button label='Primary button' primary {...buttonProps} />
        <Button label='Positive button' type='positive' {...buttonProps} />
        <Button label='Negative button' type='negative' {...buttonProps} />
        <Button label='Flat button' flat {...buttonProps} />
        <Button label='Icon button' icon='upload' {...buttonProps} />
      </FlexView>
    );
  }
}
