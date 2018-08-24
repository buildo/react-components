import * as React from 'react';
import * as cx from 'classnames';
import { props, t } from '../utils';

export namespace Form {
  export type Props = React.HTMLProps<HTMLFormElement> & {
    ref: (ref: Form | null) => void
  }
}

export const Props = t.Object

@props(Props)
export class Form extends React.PureComponent<Form.Props> {

  render() {
    const className = cx('form', this.props.className);

    return <form {...this.props} className={className} />
  }
}
