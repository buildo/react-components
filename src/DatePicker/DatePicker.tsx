import "react-dates/initialize";

import * as React from "react";
import * as cx from "classnames";
import {
  SingleDatePicker as _SingleDatePicker,
  SingleDatePickerShape
} from "react-dates";
import FlexView from "react-flexview";
import * as moment from "moment";
import { LocalDate } from "local-date";

export namespace DatePicker {
  export type Props = {
    /** an optional id to pass to top level element of the component */
    id?: string;
    /** default date */
    defaultValue?: LocalDate;
    /** called when datepicker is closed */
    onHide?: () => void;
    /** MomentJS format used to display current date */
    displayFormat?: string;
    /** minimum date selectable by the user */
    minDate?: LocalDate;
    /** maximum date selectable by the user */
    maxDate?: LocalDate;
    /** if set, the datepicker will highlight days in the range starting from this date and ending to the hovered or selected date */
    fromDate?: LocalDate;
    /** if set, the datepicker will highlight days in the range starting from the hovered or selected date to this value */
    toDate?: LocalDate;
    /** whether the datepicker should be rendered above or below the input field */
    position?: "up" | "down";
    /** whether the input box should be small or not */
    small?: boolean;
    /** the icon to show in the input field */
    icon?: JSX.Element;
    /** specify an initial "visible" date with no need to select a defaultValue */
    startDate?: LocalDate;
    /** locale used for translations */
    locale?: string;
    /** pass true if you want the datepicker to close automatically after the user selects a value */
    autoClose?: boolean;
    /** whether the datepicker should be disabled or not */
    disabled?: boolean;
    /** called when the focus changes */
    onFocusChange?: (focus: boolean) => void;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
  } & (
    | {
        /** whether the user can remove the selected date */
        isClearable: true;
        /** current date */
        value?: LocalDate;
        /** called when value changes */
        onChange?: (date?: LocalDate) => void;
      }
    | {
        /* whether the user can remove the selected date */
        isClearable?: false;
        /* current date */
        value: LocalDate;
        /* called when value changes */
        onChange?: (date: LocalDate) => void;
      });
}

export type State = {
  value?: moment.Moment;
  hoveredDay?: moment.Moment;
  focused: boolean;
};

const valueToMomentDate: (
  value?: LocalDate
) => moment.Moment | undefined = value => (!value ? undefined : moment(value));

const angleLeftIcon = (
  <svg width="10" height="10" viewBox="0 0 32 32">
    <title>angleLeft</title>
    <path
      fill="#ffffff"
      d="M20.747 0.773l-13.333 13.333c-0.479 0.482-0.775 1.146-0.775 1.88s0.296 1.398 0.776 1.88l13.333 13.333c0.492 0.572 1.217 0.932 2.025 0.932 1.473 0 2.667-1.194 2.667-2.667 0-0.809-0.36-1.533-0.929-2.023l-13.337-13.336v3.76l13.333-13.333c0.399-0.463 0.641-1.071 0.641-1.735 0-1.473-1.194-2.667-2.667-2.667-0.664 0-1.271 0.243-1.738 0.644l0.003-0.003z"
    />
  </svg>
);

const angleRightIcon = (
  <svg width="10" height="10" viewBox="0 0 32 32">
    <title>angleRight</title>
    <path
      fill="#ffffff"
      d="M7.573 4.56l13.333 13.333v-3.76l-13.333 13.333c-0.399 0.463-0.641 1.071-0.641 1.735 0 1.473 1.194 2.667 2.667 2.667 0.664 0 1.271-0.243 1.738-0.644l13.33-13.33c0.479-0.482 0.775-1.146 0.775-1.88s-0.296-1.398-0.776-1.88l-13.333-13.333c-0.463-0.399-1.071-0.641-1.735-0.641-1.473 0-2.667 1.194-2.667 2.667 0 0.664 0.243 1.271 0.644 1.738l-0.003-0.003z"
    />
  </svg>
);

const calendarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fill="#9098a7"
      fillRule="evenodd"
      d="M4 9h2V7H4v2zm0 3h2v-2H4v2zm3-3h2V7H7v2zm0 3h2v-2H7v2zm3-3h2V7h-2v2zm0 3h2v-2h-2v2zm4-6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6zm0 10H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2v1a1 1 0 0 0 2 0V0h4v1a1 1 0 0 0 2 0V0h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"
    />
  </svg>
);

const clearIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="12"
    viewBox="0 0 22 28"
  >
    <path
      fill="#9098a7"
      d="M20.281 20.656q0 0.625-0.438 1.062l-2.125 2.125q-0.438 0.438-1.062 0.438t-1.062-0.438l-4.594-4.594-4.594 4.594q-0.438 0.438-1.062 0.438t-1.062-0.438l-2.125-2.125q-0.438-0.438-0.438-1.062t0.438-1.062l4.594-4.594-4.594-4.594q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.594 4.594-4.594q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.438 0.438 1.062t-0.438 1.062l-4.594 4.594 4.594 4.594q0.438 0.438 0.438 1.062z"
    />
  </svg>
);

/**
 * A decent and pretty date picker to be used with React
 */
export class DatePicker extends React.PureComponent<DatePicker.Props, State> {
  dayRenderer!: (day: moment.Moment) => JSX.Element;

  componentWillMount() {
    if (this.props.locale) {
      moment.locale(this.props.locale);
    }
    this.dayRenderer = this.dayRendererFactory();
  }

  componentWillReceiveProps(newProps: DatePicker.Props) {
    if (newProps.locale !== this.props.locale) {
      moment.locale(newProps.locale);
    }
  }

  state = {
    value: valueToMomentDate(this.props.defaultValue || this.props.value), // needed to handle defaultValue
    hoveredDay: undefined,
    focused: false
  };

  _onChange = (value: moment.Moment | null) => {
    const { defaultValue, onChange } = this.props;

    if (!value) {
      if (this.props.isClearable) {
        const __onChange = this.props.onChange;
        this.setState(
          { value: valueToMomentDate(defaultValue) },
          () => __onChange && __onChange(undefined)
        );
      }
      // if it's not clearable value will never be null or undefined
    } else {
      this.setState(
        { value },
        () => onChange && onChange(new LocalDate(value.format("YYYY-MM-DD")))
      );
    }
  };

  isDayBlocked = (day: moment.Moment) => {
    const minDate = valueToMomentDate(this.props.minDate);
    const maxDate = valueToMomentDate(this.props.maxDate);

    return (!!minDate && day < minDate) || (!!maxDate && day > maxDate);
  };

  initialVisibleMonth = () =>
    valueToMomentDate(this.props.startDate) || this.state.value || moment();

  onFocusChange = ({ focused }: { focused: boolean | null }) => {
    this.setState({ focused: focused || false });
    this.props.onFocusChange && this.props.onFocusChange(focused || false);
  };

  onDayMouseEnter = (day: moment.Moment) => () => {
    if (!this.isDayBlocked(day)) {
      this.setState({ hoveredDay: day }, () => {
        this.dayRenderer = this.dayRendererFactory();
      });
    }
  };

  onDayMouseLeave = () => {
    this.setState({ hoveredDay: undefined }, () => {
      this.dayRenderer = this.dayRendererFactory();
    });
  };

  isInRange = (day: moment.Moment, referenceDay?: moment.Moment) => {
    const {
      props: { fromDate: _fromDate, toDate: _toDate }
    } = this;
    if ((!_fromDate && !_toDate) || !referenceDay) {
      return undefined;
    }

    const fromDate = _fromDate ? valueToMomentDate(_fromDate) : undefined;
    const toDate = _toDate ? valueToMomentDate(_toDate) : undefined;

    const isForwardRange = fromDate && day >= fromDate && day <= referenceDay;
    const isBackwardRange = toDate && day <= toDate && day >= referenceDay;

    return isForwardRange || isBackwardRange;
  };

  getDayClass = (day: moment.Moment) =>
    cx({
      CalendarDay__hovered_span: this.isInRange(day, this.state.hoveredDay),
      CalendarDay__selected_span: this.isInRange(day, this.state.value)
    });

  // See: https://github.com/airbnb/react-dates/issues/1102
  dayRendererFactory() {
    return (day: moment.Moment) => {
      const className = this.getDayClass(day);

      return (
        <FlexView
          grow
          onMouseEnter={
            this.props.fromDate || this.props.toDate
              ? this.onDayMouseEnter(day)
              : undefined
          }
          onMouseLeave={
            this.props.fromDate || this.props.toDate
              ? this.onDayMouseLeave
              : undefined
          }
          vAlignContent="center"
          hAlignContent="center"
          height="100%"
          className={className}
        >
          {day.format("D")}
        </FlexView>
      );
    };
  }

  onClose = () => {
    this.setState(
      {
        hoveredDay: undefined
      },
      this.props.onHide
    );
  };

  render() {
    const {
      id,
      className,
      style,
      displayFormat,
      small,
      icon,
      position,
      autoClose = true
    } = this.props;

    const SingleDatePicker: React.ComponentClass<
      SingleDatePickerShape & {
        horizontalMonthPadding?: number;
      }
    > = _SingleDatePicker;

    return (
      <FlexView
        className={cx("date-picker", className, {
          "is-small": small,
          "has-focus": this.state.focused
        })}
        style={style}
      >
        <SingleDatePicker
          id={id || ""}
          date={this.state.value || null}
          onDateChange={this._onChange}
          focused={this.state.focused}
          onFocusChange={this.onFocusChange}
          displayFormat={displayFormat}
          numberOfMonths={1}
          isDayBlocked={this.isDayBlocked}
          renderDayContents={this.dayRenderer}
          onClose={this.onClose}
          showClearDate={this.props.isClearable}
          enableOutsideDays
          daySize={30}
          hideKeyboardShortcutsPanel
          navPrev={
            <FlexView className="DayPickerNavigation_prev">
              {angleLeftIcon}
            </FlexView>
          }
          navNext={
            <FlexView className="DayPickerNavigation_next">
              {angleRightIcon}
            </FlexView>
          }
          customInputIcon={
            <FlexView vAlignContent="center">{icon || calendarIcon}</FlexView>
          }
          inputIconPosition="after"
          customCloseIcon={
            <FlexView vAlignContent="center">{clearIcon}</FlexView>
          }
          isOutsideRange={() => false}
          openDirection={position}
          initialVisibleMonth={this.initialVisibleMonth}
          keepOpenOnDateSelect={!autoClose}
          horizontalMonthPadding={0}
          verticalHeight={600}
        />
      </FlexView>
    );
  }
}
