import * as React from "react";
import * as cx from "classnames";
import FlexView from "react-flexview";
import { ResizeSensor } from "../../../ResizeSensor/ResizeSensor";
import { Tablo } from "../../Tablo";
import { findDOMNode } from "../../../utils";

type AutosizeGridState = {
  width?: number;
  height?: number;
};

export default <T extends {}>(
  Grid: React.ComponentClass<Tablo.Props<T>>
): React.ComponentClass<Tablo.Props<T>> => {
  return class AutosizeGrid extends React.PureComponent<
    Tablo.Props<T>,
    AutosizeGridState
  > {
    private gridWrapper: FlexView | null = null;
    state: AutosizeGridState = {};

    static defaultProps = {
      autosize: true
    };

    updateSize = () => {
      if (!this.gridWrapper) return;
      const divWrapper = findDOMNode(this.gridWrapper);
      const { clientHeight: height, clientWidth: width } = divWrapper;
      this.setState({ width, height });
    };

    componentDidMount() {
      if (this.props.autosize) {
        this.updateSize();
      }
    }

    render() {
      const { autosize, className: _className, ..._tableProps } = this.props;
      const { width = 0, height = 0 } = autosize ? this.state : {};
      const className = cx("autosize-tablo", _className);
      const tableProps = {
        width,
        height,
        className,
        ..._tableProps
      };

      const content = (
        <FlexView
          grow
          column
          width="100%"
          ref={gw => {
            this.gridWrapper = gw;
          }}
        >
          {tableProps.height > 0 && <Grid {...tableProps} />}
        </FlexView>
      );

      return autosize ? (
        <ResizeSensor onResize={this.updateSize}>{content}</ResizeSensor>
      ) : (
        content
      );
    }
  };
};
