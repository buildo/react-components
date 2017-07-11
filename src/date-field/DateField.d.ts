import { CSSProperties, ComponentType } from 'react';
import { Type } from 'tcomb';

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

export const Props: {
  [key: string]: Type<any>
}

declare const DateField: ComponentType<DateFieldProps>;
export default DateField;
