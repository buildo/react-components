import * as React from "react";
import Select from "react-select";
import Creatable from "react-select/lib/Creatable";
import * as cx from "classnames";
import {
  CommonProps,
  defaultProps,
  defaultComponents,
  defaultStyle,
  getCommonClassnames,
  DefaultProps
} from "./commons";

type NonDefaultProps<OptionType> = CommonProps<OptionType> & {
  value: OptionType[];
  onChange: (value: OptionType[]) => void;
  isClearable?: never;
};

export namespace MultiDropdown {
  export type Props<OptionType> = NonDefaultProps<OptionType> &
    Partial<DefaultProps>;
}

export class MultiDropdown<OptionType> extends React.PureComponent<
  NonDefaultProps<OptionType> & DefaultProps
> {
  static defaultProps = defaultProps;

  render() {
    const {
      props: {
        className,
        components: customComponents,
        innerRef,
        allowCreate,
        size,
        flat,
        ...props
      }
    } = this;

    const Component: any = allowCreate ? Creatable : Select;

    return (
      <Component
        styles={defaultStyle}
        {...props}
        classNamePrefix="dropdown"
        components={{
          ...defaultComponents<OptionType>(),
          ...customComponents
        }}
        className={cx(
          getCommonClassnames(size, flat || false, props.isSearchable),
          "is-multi",
          className
        )}
        ref={innerRef}
        isSearchable={allowCreate || props.isSearchable}
        isMulti
      />
    );
  }
}
