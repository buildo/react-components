import * as React from "react";
import { props, t } from "../utils";
import every = require("lodash/every");
import * as cx from "classnames";
import View from "react-flexview";

export namespace DateField {
  export type Props = {
    /** current value expressed as JS Date */
    value?: Date;
    /** called when there is a new valid value */
    onChange: (value: Date) => void;
    /** called when validity changes */
    onValidChange: (isValid: boolean) => void;
    /** map to pass placeholders to each input field */
    placeholders?: {
      day?: string;
      month?: string;
      year?: string;
    };
    /** if `true`, it passes `type='number'` to every input field */
    inputTypeNumber?: boolean;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
    /** an optional id to pass to top level element of the component */
    id?: string;
  };
}

export type State = {
  day: string;
  month: string;
  year: string;
  isDirty: boolean;
  isValid: boolean;
};

export const Props = {
  value: t.maybe(t.Date),
  onChange: t.Function,
  onValidChange: t.maybe(t.Function),
  placeholders: t.maybe(
    t.struct({
      day: t.maybe(t.String),
      month: t.maybe(t.String),
      year: t.maybe(t.String)
    })
  ),
  inputTypeNumber: t.maybe(t.Boolean)
};

function parseDate(date: Date) {
  return {
    day: String(date.getDate()),
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear())
  };
}

const initialState: State = {
  day: "",
  month: "",
  year: "",
  isDirty: false,
  isValid: false
};

/**
 *  A simple component used to visually divide UI elements
 */
@props(Props)
export class DateField extends React.PureComponent<DateField.Props, State> {
  state = this.props.value
    ? {
        ...parseDate(this.props.value),
        isValid: true,
        isDirty: false
      }
    : initialState;

  componentWillReceiveProps(nextProps: DateField.Props) {
    if (!nextProps.value && this.props.value) {
      // "value" has become "undefined"
      this.setState({ day: "", month: "", year: "", isValid: false });
    } else if (
      (nextProps.value && !this.props.value) ||
      (nextProps.value &&
        this.props.value &&
        nextProps.value.getTime() !== this.props.value.getTime())
    ) {
      // "value" exists and has changed
      const { day, month, year } = parseDate(nextProps.value);

      // this logic is needed to avoid transforming the user input "07" in the parsed number "7"
      if (
        parseInt(day) !== parseInt(this.state.day) ||
        parseInt(month) !== parseInt(this.state.month) ||
        parseInt(year) !== parseInt(this.state.year)
      ) {
        this.setState({ day, month, year });
      }
    }
  }

  isDigit(value: string): boolean {
    return /^\d+$/.test(value);
  }

  onChange: (
    key: "day" | "month" | "year"
  ) => React.ChangeEventHandler<HTMLInputElement> = key => ({
    target: { value }
  }) => {
    if (value.length === 0) {
      this.setState({
        ...this.state,
        [key]: value,
        isValid: false,
        isDirty: true
      });
      return;
    }
    // exit if value is not a number
    if (!this.isDigit(value)) {
      return;
    }

    const patch = {
      [key]: value
    };

    const values: State = {
      ...this.state,
      ...patch
    };

    const isValid = this.isValid(values);

    if (this.state.isValid !== isValid) {
      this.props.onValidChange && this.props.onValidChange(isValid);
    }

    this.setState({ isValid, ...patch, isDirty: true }, () => {
      if (
        isValid &&
        every(
          [this.state.day, this.state.month, this.state.year],
          s => s.length > 0
        )
      ) {
        this.props.onChange(
          new Date(
            parseInt(this.state.year),
            parseInt(this.state.month) - 1,
            parseInt(this.state.day)
          )
        );
      }
    });
  };

  isValid({ year, month, day }: State) {
    const _date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return (
      parseInt(year) === _date.getFullYear() &&
      parseInt(month) === _date.getMonth() + 1 &&
      parseInt(day) === _date.getDate()
    );
  }

  render() {
    const {
      props: {
        className,
        id,
        style,
        placeholders = {},
        inputTypeNumber = false
      },
      state: { day, month, year, isValid, isDirty },
      onChange
    } = this;

    const type = inputTypeNumber ? "number" : undefined;

    return (
      <View
        className={cx("date-field", className, {
          "is-invalid": isDirty && !isValid
        })}
        id={id}
        style={style}
      >
        <input
          className="day-field"
          value={day}
          placeholder={placeholders.day}
          onChange={onChange("day")}
          type={type}
        />
        <input
          className="month-field"
          value={month}
          placeholder={placeholders.month}
          onChange={onChange("month")}
          type={type}
        />
        <input
          className="year-field"
          value={year}
          placeholder={placeholders.year}
          onChange={onChange("year")}
          type={type}
        />
      </View>
    );
  }
}
