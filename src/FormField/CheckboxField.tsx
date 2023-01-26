import * as React from 'react';
import cx from 'classnames';
import Checkbox from '../Checkbox';
import { FormField } from './FormField';

type DefaultProps = {
  /** an optional custom renderer for Checkbox */
  checkboxRenderer: (props: Checkbox.Props) => JSX.Element;
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
  /** the properties of the checkbox*/
  checkboxProps: Checkbox.Props;
};

type InternalProps = DefaultProps & NonDefaultProps;

export namespace CheckboxField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class CheckboxField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    checkboxRenderer: props => <Checkbox {...props} />
  };

  render() {
    const {
      label,
      required,
      className,
      id,
      viewProps,
      checkboxRenderer,
      checkboxProps
    } = this.props;

    return (
      <FormField
        label={label}
        required={required}
        className={cx('checkbox-field', className)}
        viewProps={viewProps}
        disabled={checkboxProps.disabled}
        id={id}
        horizontal
        onLabelClick={() => checkboxProps.onChange(!checkboxProps.value)}
        render={(onFocus, onBlur) => checkboxRenderer({ ...checkboxProps, onFocus, onBlur })}
      />
    );
  }
}
