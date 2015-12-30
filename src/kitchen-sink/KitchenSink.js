import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';

export default class KitchenSink extends React.Component {

  static propTypes = {
    componentId: React.PropTypes.string.isRequired,
    codeText: React.PropTypes.string,
    components: React.PropTypes.array.isRequired,
    onSelectItem: React.PropTypes.func.isRequired,
    scope: React.PropTypes.object.isRequired,
    iso: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      codeText: props.codeText
    };
  }

  render() {
    const {
      props: {
        componentId,
        components,
        onSelectItem,
        scope,
        iso
      },
      state: { codeText }
    } = this;

    return (
      <div className='kitchen-sink'>
        <Sidebar {...{ components, componentId, onSelectItem }} >
          <Content {...{ codeText, scope, iso }} />
        </Sidebar>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { componentId, codeText } = nextProps;
    if (componentId !== this.props.componentId) {
      this.setState(
        { codeText: null },
        () => this.setState({ codeText })
      );
    }
  }

}
