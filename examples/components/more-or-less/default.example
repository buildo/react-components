class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  onExpandedChange = () => this.setState({ expanded: !this.state.expanded })

  templateExpanded() {
    return (
      <div>
        very
        <br/>
        <br/>
        long
        <br/>
        <br/>
        content
      </div>
    );
  }

  templateCollapsed() {
    return (
      <div>
        short content
      </div>
    );
  }

  render() {
    const { state: { expanded }, onExpandedChange } = this;
    const icons = { expanded: 'angle-up', collapsed: 'angle-down' };

    return (
      <MoreOrLess {...{ expanded, onExpandedChange, icons }}>
        { expanded ? this.templateExpanded() : this.templateCollapsed()}
      </MoreOrLess>
    );
  }
}
