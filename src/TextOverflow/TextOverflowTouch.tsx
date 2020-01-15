import * as React from "react";
import { TooltipTouch } from "../Tooltip/TooltipTouch";
import { Tooltip } from "../Tooltip/Tooltip";
import { ObjectOverwrite } from "../utils";

export namespace TextOverflowTouch {
  export type Props = {
    label?: string | number;
    popover?: ObjectOverwrite<
      Tooltip.Props["popover"],
      {
        content?: void & string;
      }
    >;
    id?: string;
    style?: object;
  };
}
export class TextOverflowTouch extends React.PureComponent<
  TextOverflowTouch.Props
> {
  render() {
    const { label: _label, popover, ...props } = this.props;
    const label = typeof _label === "undefined" ? "" : String(_label);

    return (
      <TooltipTouch
        {...props}
        className="text-overflow-touch"
        popover={{ ...popover, content: label }}
      >
        {label}
      </TooltipTouch>
    );
  }
}
