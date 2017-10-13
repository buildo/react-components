import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';
import FlexView from 'react-flexview';
import ResizeSensor from '../../../ResizeSensor/ResizeSensor';
import { TabloProps } from '../../Tablo';

type AutosizeGridState = {
  width?: number,
  height?: number
};

export default <T, K extends string = keyof T>(Grid: React.ComponentClass<TabloProps<T, K>>): React.ComponentClass<TabloProps<T, K>> => {

  return class AutosizeGrid extends React.PureComponent<TabloProps<T, K>, AutosizeGridState> {

    state: AutosizeGridState = {}

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

    render() {
      const { autosize, className: _className, ..._tableProps } = this.props;
      const { width = 0, height = 0 } = autosize ? this.state : {};
      const className = cx('autosize-tablo', _className);
      const tableProps = {
        width,
        height,
        className,
        ..._tableProps
      };

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
};
