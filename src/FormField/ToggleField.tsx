import * as React from 'react';
import * as cx from 'classnames';
import Toggle from '../Toggle';
import { FormField } from './FormField';

type DefaultProps = {
  /** an optional custom renderer for Toggle */
  toggleRenderer: (props: Toggle.Props) => JSX.Element;
};

type NonDefaultProps = {
  /** the label for the field */
  label: FormField.Props['label'];
  /** whether the field is required */
  required?: FormField.Props['required'];
  /** optional props to pass to the wrapping View */
  viewProps?: FormField.Props['viewProps'];
  /** an optional class name to pass to top level element of the component */
  className?: string;
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties;
  /** an optional id passed to the input component */
  id?: string;
  /** the properties of the toggle */
  toggleProps: Toggle.Props;
};

type InternalProps = NonDefaultProps & DefaultProps;

export namespace ToggleField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class ToggleField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    toggleRenderer: props => <Toggle {...props} />
  };

  render() {
    const { label, required, className, id, viewProps, toggleRenderer, toggleProps } = this.props;

    return (
      <FormField
        label={label}
        required={required}
        className={cx('toggle-field', className)}
        viewProps={viewProps}
        disabled={toggleProps.disabled}
        id={id}
        horizontal
        onLabelClick={() => toggleProps.onChange(!toggleProps.value)}
        render={(onFocus, onBlur) => toggleRenderer({ ...toggleProps, onFocus, onBlur })}
      />
    );
  }
}
