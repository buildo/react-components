export const getArrayChildren: (
  maybeArrayChildren?: React.ReactElement<any> | React.ReactElement<any>[] | undefined
) => React.ReactElement<any>[] | undefined = maybeArrayChildren =>
  maybeArrayChildren
    ? Array.isArray(maybeArrayChildren)
      ? maybeArrayChildren
      : [maybeArrayChildren]
    : undefined;
