import { CssProperties, PureComponent } from 'react'

export type NavBarProps = {
  content: {
    left?: any, // TODO: t.ReactChildren
    center?: any, // TODO: t.ReactChildren
    right?: any, // TODO: t.ReactChildren,
    maxWidth?: string | number
  },
  fixed?: boolean,
  height?: string | number,
  background?: string,
  className?: string,
  style?: CssProperties
}

export default class NavBar extends PureComponent<NavBarProps> {}
