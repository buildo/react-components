import { CSSProperties, PureComponent } from 'react'

export type ConfirmationInputProps = {
  initialValue?: string,
  onChange?: (value: string) => void,
  onConfirm?: (value: string) => void,
  onClear?: () => void,
  placeholder?: string,
  disabled?: boolean,
  text: {
    clear?: string,
    toConfirm?: string
  },
  icon: {
    clear?: string,
    toConfirm?: string
  },
  className?: string,
  id?: string,
  style?: CSSProperties
}

export default class ConfirmationInput extends PureComponent<ConfirmationInputProps> {}
