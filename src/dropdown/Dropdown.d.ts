// TODO: use react-select types https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-select/index.d.ts

import { CSSProperties, PureComponent, SyntheticEvent } from 'react'
import * as t from 'tcomb';

type Value = number | string | object | object[];

type MenuItem = {
  focusedOption: object,
  instancePrefix: string,
  onFocus: (e: SyntheticEvent<HTMLDivElement>) => void,
  onSelect: (option: object, e: SyntheticEvent<HTMLDivElement>) => void,
  groupByKey?: string,
  optionClassName: string,
  optionComponent: JSX.Element,
  optionRenderer: () => JSX.Element,
  optionGroupRenderer: () => JSX.Element
  options: object[]
  valueArray: any
  valueKey: any
}

export type DropdownProps = {
  value?: Value,
  valueLink?: {
    value?: Value,
    requestChange: (value: Value) => void
  },
  onChange?: (value?: Value) => void,
  onValueClick?: () => void,
  options: object[],
  size?: 'small' | 'medium',
  disabled?: boolean,
  searchable?: boolean,
  clearable?: boolean,
  backspaceRemoves?: boolean,
  multi?: boolean,
  flat?: boolean,
  autoBlur?: boolean,
  simpleValue?: boolean,
  menuPosition?: 'top' | 'bottom',
  menuRenderer?: (menuItem: object) => any, // TODO: t.ReactChildren
  groupByKey?: string,
  optionGroupRenderer?: (title: string) => any, // TODO: t.ReactChildren
  placeholder?: JSX.Element | string, // TODO: t.maybe(t.union([t.String, t.ReactElement]))
  noResultsText?: JSX.Element | string,
  allowCreate?: boolean,
  addLabelText?: JSX.Element | string,
  valueRenderer?: (option: object) => JSX.Element, // TODO: t.ReactChildren
  optionRenderer?: (option: object) => JSX.Element, // TODO: t.ReactChildren
  delimiter?: string,
  onInputChange?: () => void,
  onFocus?: () => void,
  onBlur?: () => void,
  onBlurResetsInput?: boolean,
  onCloseResetsInput?: boolean,
  isLoading?: boolean,
  id?: string,
  className?: string,
  style?: CSSProperties
}

export default class Dropdown extends PureComponent<DropdownProps, void> {}

export var Props: {
  [key: string]: t.Type<any>
};

