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
          direction: 'left',
          onExpand,
          onCollapse,
          isCollapsed
        }
      },
      dark: true
    };

    return (
      <FlexView width={isCollapsed ? 90 : undefined}>
        <Panel {...panelProps} style={{ height: isCollapsed ? 200 : undefined }}>
          <img src='./src/Panel/examples/image4.png' width={310} />
        </Panel>
      </FlexView>
    );
  }

}
