class Example extends React.Component {

  constructor() {
  	super();
    this.state = {};
  }

  show = () => this.setState({ isShow: true });

  hide = () => this.setState({ isShow: false });

  getBackgroundDimmer = () => (
    <BackgroundDimmer color='black' alpha={0.5} stopScrollPropagation onClickOutside={this.hide}>
      <ScrollView style={{ backgroundColor: 'yellow', height: 120, width: 200 }} scrollPropagation={false}>
        <div style={{ height: 200 }}>CONTENT</div>
      </ScrollView>
    </BackgroundDimmer>
  );

  render() {
    const {
      state: { isShow },
      getBackgroundDimmer, show
    } = this;
    return (
      <div style={{ height: 50, width: '100%' }}>
        {isShow ?
          getBackgroundDimmer() :
          <button onClick={show}>SHOW</button>
        }
      </div>
    );
  }

}
