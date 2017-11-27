### Examples

```js
initialState = { openedSections: ['General Info'] };

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

const sections = {
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

const isSectionOpen = (section) => state.openedSections.indexOf(section) >= 0;

const onChange = (section) => (isOpen) => {
  if (isOpen) setState({ openedSections: [ ...state.openedSections, section ] });
  else setState({ openedSections: state.openedSections.filter(el => el !== section) });
};

<FlexView column>

  {Object.keys(sections).map(section => (

    <CollapsibleSection
      isOpen={isSectionOpen(section)}
      onChange={onChange(section)}
      header={section}
      key={section}
      icons={{ open: 'angleDown', closed: 'angleRight' }}
    >
      <SectionList items={sections[section]} />
    </CollapsibleSection>

  ))}

</FlexView>
```
