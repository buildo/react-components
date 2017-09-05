import React from 'react';
import ReactDOM from 'react-dom';
import { props, t } from '../../../utils';
import * as cx from 'classnames';
import FlexView from 'react-flexview';
import ResizeSensor from '../../../ResizeSensor/ResizeSensor';

const { maybe } = t;

export default (Grid) => {

  class AutosizeGrid extends React.PureComponent {

    state = {}

    static defaultProps = {
      autosize: true
    }

    updateSize = () => {
      const wrapper = ReactDOM.findDOMNode(this.refs.gridWrapper);
      const { clientHeight: height, clientWidth: width } = wrapper;
      this.setState({ width, height });
    }

    componentDidMount() {
      if (this.props.autosize) {
        this.updateSize();
      }
    }

    getLocals({ autosize, className, ...tableProps }) {

      const { width = 0, height = 0 } = autosize ? this.state : {};

      return {
        width,
        height,
        autosize,
        className: cx('autosize-tablo', className),
        ...tableProps
      };
    }

    render() {

      const { autosize, ...tableProps } = this.getLocals(this.props);

      const content = (
        <FlexView grow column width='100%' ref='gridWrapper'>
          {tableProps.height > 0 && <Grid {...tableProps} />}
        </FlexView>
      );

      return autosize ? (
        <ResizeSensor onResize={this.updateSize}>
          {content}
        </ResizeSensor>
      ) : content;
    }
  }

  props({
    className: maybe(t.String),
    autosize: maybe(t.Boolean)
  }, { strict: false })(AutosizeGrid);

  return AutosizeGrid;
};
