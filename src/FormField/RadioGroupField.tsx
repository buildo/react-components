import * as React from 'react';
import * as cx from 'classnames';
import RadioGroup from '../RadioGroup';
import { FormField } from './FormField';

type DefaultProps = {
  /** an optional custom renderer for RadioGroupField */
  radioGroupRenderer: (props: RadioGroup.Props) => JSX.Element;
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
  /** the properties of the radio group */
  radioGroupProps: RadioGroup.Props;
};

type InternalProps = NonDefaultProps & DefaultProps;

export namespace RadioGroupField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class RadioGroupField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    radioGroupRenderer: props => (
      <RadioGroup {...props} style={{ marginTop: '16px', ...props.style }} />
    )
  };

  render() {
    const {
      label,
      required,
      className,
      id,
      viewProps,
      radioGroupRenderer,
      radioGroupProps
    } = this.props;

    return (
      <FormField
        label={label}
        required={required}
        className={cx('radio-group-field', className)}
        viewProps={viewProps}
        disabled={radioGroupProps.disabled}
        id={id}
        render={() => radioGroupRenderer({ ...radioGroupProps })}
      />
    );
  }
}
