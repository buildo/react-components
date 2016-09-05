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

  state = { isCollapsed: false };

  onExpand = () => this.setState({ isCollapsed: false });

  onCollapse = () => this.setState({ isCollapsed: true });

  render() {

    const { onExpand, onCollapse, state: { isCollapsed } } = this;
    const panelProps = {
      type: 'floating',
      header: {
        title: 'Best Article',
        collapse: {
          direction: 'up',
          onExpand,
          onCollapse,
          isCollapsed
        }
      }
    };

    return (
      <Panel {...panelProps}>
        <Card title='Ho(s)tel in Reykjavic' author='Taylor Cambell' date='7th of March' image='image3.png'>
          Celiac hoodie art party chia cardigan pork belly ugh,
          fanny pack tousled.
          Master cleanse bicycle rights thundercats,
          cronut hella lomo tousled normcore wayfarers freegan
          readymade banjo ennui actually bushwick.
          Tumblr offal salvia art party, hashtag echo park ramps
          kitsch cardigan 8-bit listicle single-origin coffee.
          Bitters kickstarter literally scenester 8-bit,
          health goth schlitz dreamcatcher banh mi poutine pug polaroid etsy.
          Paleo fap lomo cred bespoke poutine.
          Fap organic pork belly trust fund, bushwick polaroid whatever.
          Seitan literally intelligentsia, taxidermy health goth master
          cleanse trust fund 90's YOLO kogi bespoke drinking vinegar banhmi PBR&B.
          Food truck pickled pitchfork
        </Card>
      </Panel>
    );
  }

}
