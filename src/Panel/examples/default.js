const Card = ({ title, author, date, image, children }) => (
  <FlexView className='card'>
    <FlexView shrink basis='100%' className='description'>
      <FlexView column>
        <FlexView className='title'>{title}</FlexView>
        <FlexView className='subtitle'>
          <FlexView className='author'>{author}</FlexView>
          <FlexView className='date'>{date}</FlexView>
        </FlexView>
        {children}
      </FlexView>
    </FlexView>
    <FlexView shrink basis='100%'>
      <img src={`./src/Panel/examples/${image}`} />
    </FlexView>
  </FlexView>
);


class Example extends React.Component {

  render() {
    return (
      <Panel type='floating'>
        <Card title='The Student Hotel' author='Taylor Cambell' date='7th of March' image='image1.png'>
          What is boutique hotel design, and why does it matter?
          There are fashion trends in hotel design just
          as there are in other areas. In the late eighties and
          through the nineties, that fashion was for clean, stark,
          minimalist design, particularly in city hotels. This was
          such a diversion from the traditional way.
        </Card>
      </Panel>
    );
  }

}
