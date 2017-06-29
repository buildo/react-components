import { CSSProperties, PureComponent } from 'react'

export type ToggleProps = {
  value?: boolean,
  onChange?: (value: boolean) => void,
  valueLink?: {
    value?: boolean,
    requestChange: (value: boolean) => void
  },
  size?: number |string,
  className?: string,
  style?: CSSProperties
}

export default class Toggle extends PureComponent<ToggleProps, void> {}
