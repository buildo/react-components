import Select from "react-select";
import * as SelectNS from "react-select/lib/Select";
import { CreatableProps } from "react-select/lib/Creatable";
import { ObjectOmit } from "src/utils";
import * as cx from "classnames";

export type DefaultProps = {
  delimiter: NonNullable<SelectNS.Props["delimiter"]>;
  size: "medium" | "small";
  isSearchable: NonNullable<SelectNS.Props["isSearchable"]>;
  menuPlacement: NonNullable<SelectNS.Props["menuPlacement"]>;
};

export type CommonProps<OptionType> = ObjectOmit<
  SelectNS.Props<OptionType>,
  "isMulti" | "onChange" | "value"
> & {
  flat?: boolean;
  innerRef?: (ref: Select<OptionType> | null) => void;
} & (
    | ({
        allowCreate: true;
        isSearchable?: never;
      } & CreatableProps<OptionType>)
    | {
        allowCreate?: never;
      });

export const defaultProps: DefaultProps = {
  delimiter: ",",
  size: "medium",
  isSearchable: false,
  menuPlacement: "bottom"
};

export const defaultComponents = <OptionType extends {}>(): SelectNS.Props<
  OptionType
>["components"] => ({
  IndicatorSeparator: () => null
});

export const getCommonClassnames = (
  size: DefaultProps["size"],
  flat: boolean,
  isSearchable: boolean
) => {
  return cx({
    dropdown: true,
    "is-medium": size === "medium",
    "is-small": size === "small",
    "is-flat": flat,
    "is-searchable": isSearchable
  });
};

export const defaultStyle = {
  input: () => ({ margin: 0, padding: 0 })
};
