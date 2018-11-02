import * as React from "react";
import * as ReactDOM from "react-dom";
import * as cx from "classnames";
import { props, t, ReactChildren } from "../utils";
import partial = require("lodash/partial");
import FlexView from "react-flexview";
import { Divider } from "../Divider/Divider";

export type ActionsMenuRequiredProps = {
  options?: ActionsMenu.Option[];
  maxHeight?: number;
};

export type ActionsMenuDefaultProps = {
  style: React.CSSProperties;
  onClick: () => void;
};

export namespace ActionsMenu {
  export type Option = {
    type: "title" | "item" | "divider";
    title?: JSX.Element | string;
    metadata?: JSX.Element | string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: OptionClickHandler;
  };

  export type OptionClickHandler = (o: Option) => void;

  export type Props = ActionsMenuRequiredProps &
    Partial<ActionsMenuDefaultProps>;
}

export type State = {
  height: number | null;
};

export const optionType = t.struct(
  {
    type: t.enums.of(["title", "item", "divider"]),
    title: t.maybe(ReactChildren),
    metadata: t.Any,
    selected: t.maybe(t.Boolean),
    disabled: t.maybe(t.Boolean),
    onClick: t.maybe(t.Function)
  },
  "optionType"
);

export const Props = {
  style: t.maybe(t.Object),
  maxHeight: t.maybe(t.Number),
  options: t.maybe(t.list(optionType)),
  onClick: t.maybe(t.Function)
};

const defaultProps: ActionsMenuDefaultProps = {
  style: {},
  onClick: () => {}
};

@props(Props)
export class ActionsMenu extends React.PureComponent<ActionsMenu.Props, State> {
  constructor(props: ActionsMenu.Props) {
    super(props);
    this.state = {
      height: null
    };
  }

  getProps() {
    return { ...defaultProps, ...this.props };
  }

  componentDidMount() {
    const { top: scrollTop, height } = ReactDOM.findDOMNode(
      this
    ).getBoundingClientRect();
    const {
      height: wHeight
    } = document.documentElement.getBoundingClientRect();
    if (wHeight - (scrollTop + height) < 20) {
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        height: wHeight - scrollTop - 20
      });
    }
  }

  onOptionClick: ActionsMenu.OptionClickHandler = option => {
    const { onClick } = this.getProps();
    onClick();
    if (!option.disabled && option.onClick) {
      option.onClick(option);
    }
  };

  menuActionTemplate = (
    option: ActionsMenu.Option,
    onOptionClick: ActionsMenu.OptionClickHandler
  ) => {
    return (
      <FlexView
        className={cx("menu-action", {
          disabled: option.disabled,
          selected: option.selected
        })}
        onClick={partial(onOptionClick, option)}
        vAlignContent="center"
      >
        <FlexView grow shrink className="menu-action-title">
          {option.title}
        </FlexView>
        <FlexView
          grow
          shrink={false}
          className="menu-action-metadata"
          hAlignContent="right"
        >
          {option.metadata}
        </FlexView>
      </FlexView>
    );
  };

  templateRenderedOptions = ({
    options,
    onOptionClick
  }: {
    options?: ActionsMenu.Option[];
    onOptionClick: ActionsMenu.OptionClickHandler;
  }) => {
    return (
      options &&
      options.map((option, i) => (
        <div className="menu-row" key={i}>
          {option.type === "title" && (
            <div className="menu-title">{option.title}</div>
          )}
          {option.type === "item" &&
            this.menuActionTemplate(option, onOptionClick)}
          {option.type === "divider" && <Divider />}
        </div>
      ))
    );
  };

  render() {
    const { options, style, maxHeight: maxHeightProp } = this.getProps();
    const maxHeight = this.state.height || maxHeightProp;
    const { onOptionClick } = this;

    return (
      <div className="actions-menu" style={{ ...style, maxHeight }}>
        {this.templateRenderedOptions({ options, onOptionClick })}
      </div>
    );
  }
}
