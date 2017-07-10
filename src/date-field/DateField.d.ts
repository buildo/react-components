import { CSSProperties, ComponentType } from 'react';

export type DateFieldProps = {
  value?: Date,
  onChange: (value: Date) => void,
  onValidChange: (isValid: boolean) => void,
  placeholders?: {
    day?: string,
    month?: string,
    year?: string
  },
  inputTypeNumber?: boolean
};

declare const DateField: ComponentType<DateFieldProps>;
export default DateField;
