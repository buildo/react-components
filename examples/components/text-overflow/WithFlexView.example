const Example = React.createClass({

  getTemplate() {
    const label = 'sono un testo lungo lungo lungo';
    return (
      <FlexView style={{ maxWidth: 150 }}>
        <TextOverflow style={{ color: 'blue' }} label={label}>
          {(self) =>
            <Popover popover={{ content: label }} style={{ color: 'red', width: '100%' }}>
              {self}
            </Popover>
          }
        </TextOverflow>
      </FlexView>
    );
  },

  render() {
    return this.getTemplate();
  }

});
