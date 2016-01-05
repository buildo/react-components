import React from 'react';
import find from 'lodash/collection/find';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';

export default class KitchenSink extends React.Component {

  static propTypes = {
    componentId: React.PropTypes.string,
    sections: React.PropTypes.array,
    components: React.PropTypes.array,
    onSelectItem: React.PropTypes.func.isRequired,
    scope: React.PropTypes.object.isRequired,
    iso: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      component: this.findComponent(props.componentId)
    };
  }

  onSelectItem = (componentId) => this.props.onSelectItem(componentId, this.findSectionId(componentId))

  findSectionId = (componentId) => {
    const { sections } = this.props;
    if (sections) {
      return find(sections, (section) => find(section.components, { id: componentId })).id;
    }
  }

  findComponent = (componentId) => {
    const { sections, components } = this.props;
    if (components) {
      return find(components, { id: componentId });
    } else {
      return sections.reduce((acc, s) => acc || find(s.components, { id: componentId }), null);
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
      state: { component }
    } = this;

    return (
      <div className='kitchen-sink'>
        <Sidebar {...{ sections, components, componentId, onSelectItem }} >
          <Content {...{ component, scope, iso }} />
        </Sidebar>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { componentId } = nextProps;
    if (componentId !== this.props.componentId) {
      this.setState(
        { component: null },
        () => this.setState({ component: this.findComponent(componentId) })
      );
    }
  }

}
