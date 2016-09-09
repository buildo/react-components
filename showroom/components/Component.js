import React from 'react';
import { props, t } from 'tcomb-react';
import find from 'lodash/find';
import Markdown from 'react-remarkable';
import KitchenSink from '../../src/kitchen-sink';


@props({
  router: t.Function,
  query: t.Object,
  params: t.Object,
  sections: t.Array,
  openSections: t.Array,
  section: t.Object,
  onToggleSection: t.Function,
  scope: t.Object,
  onSelectItem: t.Function
})
export default class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.loadComponent();
  }

  loadComponent = (props = this.props) => {
    const { params: { componentId }, sections, section } = props;

    const componentInfo = find(section.components, { id: componentId });

    const { readme, examples } = componentInfo;

    // README
    const splittedMarkdown = readme && readme.split('## Props');
    const header = readme ?
      <Markdown source={splittedMarkdown[0]} options={{ html: true }} /> :
      '';
    const footer = readme ?
      splittedMarkdown[1] && <Markdown source={`### Props\n${splittedMarkdown[1]}`} options={{ html: true }} /> :
      '';

    // EXAMPLES
    const components = section.components.map(c => c.id === componentId ? { ...c, examples } : c);
    const mappedSections = sections.map(s => s.id === section.id ? { ...s, components } : s);

    this.setState({ sections: mappedSections, header, footer, loading: false });
  }

  getPatchedScope = (scope, componentId) => ({
    ...scope,
    FlexView: componentId === 'react-flexview' ? require('gh-deps/node_modules/react-flexview/src').default : scope.FlexView,
    InputChildren: componentId === 'react-input-children' ? require('gh-deps/node_modules/react-input-children/src').default : scope.InputChildren,
    DatePicker: componentId === 'rc-datepicker' ? require('rc-datepicker/src').DatePicker : scope.DatePicker,
    DatePickerInput: componentId === 'rc-datepicker' ? require('rc-datepicker/src').DatePickerInput : scope.DatePickerInput,
    TextareaAutosize: componentId === 'react-autosize-textarea' ? require('react-autosize-textarea/src').default : scope.TextareaAutosize,
    CookieBanner: componentId === 'react-cookie-banner' ? require('react-cookie-banner/src').default : scope.CookieBanner,
    cookie: componentId === 'react-cookie-banner' ? require('react-cookie-banner/src').cookie : scope.cookie
  })

  render() {
    const {
      getPatchedScope,
      state: {
        header, footer, loading,
        sections: mappedSections
      },
      props: {
        openSections, onToggleSection,
        onSelectItem, scope,
        sections: propSections,
        params: { componentId, sectionId }
      }
    } = this;

    const props = {
      openSections, sectionId, componentId,
      onToggleSection, onSelectItem, header, footer, loading,
      sections: mappedSections || propSections,
      scope: getPatchedScope(scope, componentId)
    };

    return <KitchenSink {...props} />;
  }

  componentWillReceiveProps(nextProps) {
    const { params: { componentId, sectionId } } = nextProps;
    if (componentId !== this.props.params.componentId || sectionId !== this.props.params.sectionId) {
      // resetState
      this.state = { loading: true };
      this.forceUpdate();

      this.loadComponent(nextProps);
    }
  }

}
