const SectionList = ({ items }) => (
  <FlexView className='section' column>
    {Object.keys(items).map(k => (
      <FlexView key={k} className='item' vAlignContent='center'>
        <FlexView shrink width='100%' className='key'>{k}</FlexView>
        <FlexView shrink width='100%' className='value'>{items[k]}</FlexView>
      </FlexView>
    ))}
  </FlexView>
);

class Example extends React.Component {

  sections = {
    'General Info': {
      Name: 'Edgar Kennedy',
      Email: 'edgar.kennedy@dashboard.com',
      Country: 'London, United Kingdom',
      'Favorite movie': 'Citizen Kane - Orson Welles',
      'Favorite song': 'Smooth Sailing - Queens of the Stone Age'
    },
    'Job Info': {
      Company: 'Buildo',
      Position: 'Software Engineer'
    },
    'Skill Set': {
      Programming: 'Good',
      Communications: 'Good',
      Flexibility: 'Average'
    }
  };

  state = {
    openedSections: ['General Info']
  };

  isSectionOpen = (section) => this.state.openedSections.indexOf(section) >= 0;

  onChange = (section) => (isOpen) => {
    if (isOpen) this.setState({ openedSections: [ ...this.state.openedSections, section ] });
    else this.setState({ openedSections: this.state.openedSections.filter(el => el !== section) });
  }

  render = () => (
    <FlexView column>

      {Object.keys(this.sections).map(section => (

        <CollapsableSection
          isOpen={this.isSectionOpen(section)}
          onChange={this.onChange(section)}
          header={section}
          key={section}
          icons={{ open: 'angleDown', closed: 'angleRight' }}
        >
          <SectionList items={this.sections[section]} />
        </CollapsableSection>

      ))}

    </FlexView>
  )
}
