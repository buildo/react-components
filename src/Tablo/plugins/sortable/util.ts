import { ColumnProps } from '../../Column';

export const getArrayChildren = <T, K extends keyof T>(maybeArrayChildren: ColumnProps.ColumnChildren<T, K>) => Array.isArray(maybeArrayChildren) ? maybeArrayChildren : [maybeArrayChildren];
