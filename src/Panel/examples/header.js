// import { Panel } from 'buildo-react-components/lib/Panel';

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

    const headerContent = (
      <FlexView vAlignContent='center'>
        <Icon icon='news' />News
      </FlexView>
    );

    const panelHeader = {
      title: headerContent
    };

    return (
      <Panel type='floating' header={panelHeader}>
        <Card title='The Student Hotel' author='Taylor Cambell' date='7th of March' image='image1.png'>
          What is boutique hotel design, and why does it matter?
          There are fashion trends in hotel design just
          as there are in other areas. In the late eighties and
          through the nineties, that fashion was for clean, stark,
          minimalist design, particularly in city hotels. This was
          such a diversion from the traditional way.
        </Card>
        <Divider />
        <Card title='A Surf Odyssey' author='Taylor Cambell' date='1th of March' image='image2.png'>
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
