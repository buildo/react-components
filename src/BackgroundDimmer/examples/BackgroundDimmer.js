// import BackgroundDimmer from 'buildo-react-components/lib/BackgroundDimmer';

const Card = ({ image, title, author, children }) => (
  <FlexView column width={350} className='card'>
    <img src={`./src/BackgroundDimmer/examples/${image}`} />
    <FlexView vAlignContent='center'>
      <FlexView grow className='card-title'>{title}</FlexView>
      <FlexView shrink={false} className='card-rating'><img src='./src/BackgroundDimmer/examples/rating.png' heigth={12} /></FlexView>
    </FlexView>
    <FlexView className='card-author'>{author}</FlexView>
    {children}
  </FlexView>
);

class Example extends React.Component {

  state = { opened: false }

  show = () => this.setState({ opened: true });

  hide = () => this.setState({ opened: false });

  render() {
    const { state: { opened }, show, hide } = this;
    return opened ? (
      <BackgroundDimmer stopScrollPropagation onClickOutside={hide} color='black' alpha={0.85}>
        <Card image='cover.png' title='Utopia' author='Dennis Kelly'>
          After a group of people, who meet online, discover a bizarre graphic novel
          which seems to hold mysterious answers, they find themselves being tracked
          down by a merciless organization known merely as 'The Network'.
        </Card>
      </BackgroundDimmer>
    ) : <Button onClick={show}>Show content</Button>;
  }

}
