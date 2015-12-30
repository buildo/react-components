import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';

export default class KitchenSink extends React.Component {

  static propTypes = {
    componentId: React.PropTypes.string.isRequired,
    examples: React.PropTypes.array,
    sections: React.PropTypes.array,
    components: React.PropTypes.array,
    onSelectItem: React.PropTypes.func.isRequired,
    scope: React.PropTypes.object.isRequired,
    iso: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      examples: props.examples
    };
  }

  onSelectItem = (componentId) => this.props.onSelectItem(componentId, this.findSectionId(componentId))

  findSectionId = (componentId) => {
    const { sections } = this.props;
    if (sections) {
      return find(sections, (section) => find(section.components, { id: componentId })).id;
    }
  }

  render() {
    const {
      props: {
        componentId,
        sections,
        components,
        onSelectItem,
        scope,
        iso
      },
      state: { examples }
    } = this;

    return (
      <div className='kitchen-sink'>
        <Sidebar {...{ sections, components, componentId, onSelectItem }} >
          <Content {...{ examples, scope, iso }} />
        </Sidebar>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { componentId, examples } = nextProps;
    if (componentId !== this.props.componentId) {
      this.setState(
        { examples: null },
        () => this.setState({ examples })
      );
    }
  }

}
