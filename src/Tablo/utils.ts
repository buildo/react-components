import { ReactInstance } from "react";
import * as ReactDOM from "react-dom";

export const getArrayChildren: (
  maybeArrayChildren?:
    | React.ReactElement<any>
    | React.ReactElement<any>[]
    | undefined
) => React.ReactElement<any>[] | undefined = maybeArrayChildren =>
  maybeArrayChildren
    ? Array.isArray(maybeArrayChildren)
      ? maybeArrayChildren
      : [maybeArrayChildren]
    : undefined;

export const findDOMNode = <E extends Element = Element>(
  ref: ReactInstance
): E => ReactDOM.findDOMNode(ref) as E;
