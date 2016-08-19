const content = (
  <div style={{backgroundColor: 'yellow', width: 200}}>
    <div>
      Popover Title
    </div>
    <div>
      <p>SONO</p>
      <p>UN</p>
      <p>POPOVER</p>
      <p>APERTO</p>
    </div>
  </div>
);

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      isOpen: true
    };
  },

  toggle(isOpen) {
    this.setState({ isOpen });
  },

  getPopoverProps() {
    return {
      content,
      position: 'bottom',
      anchor: 'center',
      attachToBody: true,
      dismissOnClickOutside: true,
      dismissOnScroll: false,
      event: 'click',
      offsetX: 0,
      distance: 15,
      offsetY: -15,
      onToggle: this.toggle,
      isOpen: this.state.isOpen
    };
  },

  getTemplate() {
    return (
      <div>
        <div style={{marginTop: 200, marginLeft: 130}}>
          <Popover popover={this.getPopoverProps()}>
            <button ref='target' style={{backgroundColor: 'green', display: 'inline-block'}}>
              INITIALLY OPEN
            </button>
          </Popover>
        </div>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});
