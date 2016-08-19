class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showUpperButton: true, showLowerButton: false };
  }

  showButtons = (event) => {
    this.setState({ showUpperButton : event.nativeEvent.target.scrollTop < 250, showLowerButton: event.nativeEvent.target.scrollTop > 250 });
  }

  getTemplate = () => (
      <div>
        <ScrollView
          className='hello'
          easing='easeInOutQuad'
          scrollPropagation={false}
          onScroll={this.showButtons}
          style={{ backgroundColor: 'blue', maxHeight: 500}}>
            {(scrollTo) => (
              <div>
                {this.state.showUpperButton && <button style={{ position: 'absolute', top: 0 }} onClick={partial(scrollTo, 0, 300, 1500)}>
                  Go to bottom
                </button>}
                <div style={{backgroundColor: 'red', height: 200, width: '100%'}}/>
                <div style={{backgroundColor: 'green', height: 200, width: '100%'}}/>
                <div style={{backgroundColor: 'yellow', height: 200, width: '100%'}}/>
                <div style={{backgroundColor: 'black', height: 200, width: '100%'}}/>
                {this.state.showLowerButton && <button style={{ position: 'absolute', bottom: 0 }} onClick={partial(scrollTo, 0, 0, 1500)}>
                  Go to top
                </button>}
              </div>
            )}
        </ScrollView>
      </div>
    );

  render() {
    return this.getTemplate();
  }
};
