import { CSSProperties, PureComponent } from 'react';

export type CollapsableSectionProps = {
  children: any, // TODO: t.ReactChildren
  isOpen: boolean,
  isSelected?: boolean,
  onChange: (isOpen: boolean) => void,
  onOpen?: () => void,
  onClose?: () => void,
  header?: any, // TODO: t.ReactChild
  icons?: {
    open?: string,
    closed?: string
  },
  className?: string,
  id?: string,
  style?: CSSProperties
}

export default class CollapsableSection extends PureComponent<CollapsableSectionProps> {}
