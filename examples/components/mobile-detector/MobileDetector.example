const CheckContext = React.createClass({

  contextTypes: {
    isDesktop: React.PropTypes.bool.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
    isPhone: React.PropTypes.bool.isRequired,
    isTablet: React.PropTypes.bool.isRequired
  },

  render() {
    console.log(JSON.stringify(this.context, null, 2));
    return <div>{JSON.stringify(this.context, null, 2)}</div>;
  }

});

const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <MobileDetector>
          {() => <CheckContext />}
        </MobileDetector>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});
