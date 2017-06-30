import { CSSProperties, PureComponent } from 'react'
import * as t from 'tcomb';

export namespace PopoverProps {

  type Position = 'top' | 'bottom' | 'left' | 'right'
  type Anchor = 'start' | 'center' | 'end'
  type Event = 'click' | 'hover'

  type Popover = {
    content: any, // TODO: t.ReactChildren
    attachToBody?: boolean,
    position?: Position,
    anchor?: Anchor,
    event?: Event,
    onShow?: () => void,
    onHide?: () => void,
    onToggle?: () => void,
    dismissOnScroll?: boolean,
    dismissOnClickOutside?: boolean,
    className?: string,
    style?: CSSProperties,
    id?: string,
    maxWidth?: number | string,
    distance?: number,
    offsetX?: number,
    offsetY?: number,
    isOpen?: boolean,
    delay?: number | { whenClosed?: number, whenOpen?: number }
  }
}

export type PopoverProps = {
  children: any, // TODO: t.ReactChildren,
  popover: PopoverProps.Popover,
  className?: string,
  style?: CSSProperties,
  id?: string,
}

export default class Popover extends PureComponent<PopoverProps, void> {}

export var Props: {
  [key: string]: t.Type<any>
}
