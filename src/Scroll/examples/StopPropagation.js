// import ScrollView from 'buildo-react-components/lib/Scroll';

const Example = React.createClass({

  propTypes: {},

  mixins: [React.addons.LinkedStateMixin],

  getTemplate() {
    return (
      <div>
        <ScrollView
          className='hello'
          easing='easeInOutQuad'
          scrollPropagation={false}
          style={{backgroundColor: 'blue', maxHeight: 500}}>
            <div>
              <div style={{backgroundColor: 'black', height: 200, width: '100%'}}/>
              <div style={{backgroundColor: 'gray', height: 200, width: '100%'}}/>
              <div style={{backgroundColor: 'brown', height: 200, width: '100%'}}/>
              <div style={{backgroundColor: 'orange', height: 200, width: '100%'}}/>
            </div>
        </ScrollView>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});
