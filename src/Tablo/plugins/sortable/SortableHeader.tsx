import * as React from "react";
import * as cx from "classnames";
import FlexView from "react-flexview";
import Arrow from "./Arrow";
import { Children } from "../../../utils";

export type Props = {
  sortDir?: "asc" | "desc";
  children: Children;
};

export default class SortableHeader extends React.PureComponent<Props> {
  render() {
    const { sortDir, children } = this.props;
    const arrowDir =
      sortDir === "asc" ? "up" : sortDir === "desc" ? "down" : "up-down";
    const classNames = cx({
      sorted: !!sortDir,
      [`sort-${sortDir}`]: !!sortDir
    });

    return (
      <FlexView
        className={cx("sortable-header", classNames)}
        vAlignContent="center"
        grow
        height="100%"
      >
        <FlexView grow height="100%" vAlignContent="center">
          {children}
        </FlexView>
        <FlexView
          className="sort-icon"
          vAlignContent="center"
          hAlignContent="center"
          basis={20}
          height="100%"
        >
          <Arrow arrowDir={arrowDir} />
        </FlexView>
      </FlexView>
    );
  }
}
