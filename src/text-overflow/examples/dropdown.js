class Example extends React.Component {

  state = { value: undefined };

  options = [
    {
      value: 1,
      label: 'This is the first very long option'
    }, {
      value: 2,
      label: 'This is the second very long option'
    }, {
      value: 3,
      label: 'This is the third very long option'
    }
  ];

  onChange = (value) => this.setState({ value });

  formatter = ({ label }) => (
    <FlexView height='100%' vAlignContent='center'>
      <TextOverflow label={label}>
        {(self, isOpen) => (
          <Tooltip popover={{ position: 'top', content: label, isOpen, attachToBody: true }} style={{ width: '100%' }}>
            {self}
          </Tooltip>
        )}
      </TextOverflow>
    </FlexView>
  );

  render() {

    const { options, onChange, formatter, state: { value } } = this;

    const dropdownProps = {
      searchable: true,
      options,
      onChange,
      optionRenderer: formatter,
      valueRenderer: formatter,
      value,
      style: { width: '100%' }
    };

    return (
      <FlexView style={{ maxWidth: 50 }}>
        <Dropdown {...dropdownProps} />
      </FlexView>
    );
  }

}