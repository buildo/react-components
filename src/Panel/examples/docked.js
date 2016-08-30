class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isCollapsed: false };
  }

  onExpand = () => this.setState({ isCollapsed: false })

  onCollapse = () => this.setState({ isCollapsed: true })

  render() {
    const { onExpand, onCollapse, state: { isCollapsed } } = this;
    const panelProps = {
      type: 'docked-top',
      header: {
        title: 'Collapsable panel!',
        collapse: {
          direction: 'left',
          onExpand,
          onCollapse,
          isCollapsed
        }
      }
    }

    return (
      <FlexView width={isCollapsed ? 30 : undefined}>
        <Panel {...panelProps} style={{ height: 240 }}>
          <div className='my-panel-content' style={{ height: 100 }}>
            <p>HELLO!</p>
          </div>
        </Panel>
      </FlexView>
    );
  }

}
