// import { TabbedPanel } from 'buildo-react-components/lib/Panel';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeTabIndex: 0 };
  }

  onSetActiveTab = (activeTabIndex) => this.setState({ activeTabIndex })

  render() {
    const { onSetActiveTab, state: { activeTabIndex } } = this;
    const panelProps = {
      type: 'docked-top',
      tabs: {
        headers: [ 'All Projects', 'Synced Projects', 'My Projects' ],
        onSetActiveTab,
        activeIndex: activeTabIndex
      },
      header: {
        title: 'Tabbed panel!'
      }
    };

    const tab = panelProps.tabs.headers[activeTabIndex];

    return (
      <TabbedPanel {...panelProps}>
        <div style={{ height: 200 }}>
          <p>{tab} content</p>
        </div>
      </TabbedPanel>
    );
  }

}
