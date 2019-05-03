import * as React from "react";
import * as cx from "classnames";
import { SingleDatePicker } from "react-dates";
import FlexView from "react-flexview";
import { props, t, ReactChild } from "../utils";
import * as moment from "moment";

export namespace DatePicker {
  export type Props = {
    /** an optional id to pass to top level element of the component */
    id?: string;
    /** current date */
    value?: Date;
    /** default date */
    defaultValue?: Date;
    /** called when value changes */
    onChange?: (date?: Date) => void;
    /** called when datepicker is closed */
    onHide?: () => void;
    /** MomentJS format used to display current date */
    displayFormat?: string;
    /** minimum date selectable by the user */
    minDate?: Date | string;
    /** maximum date selectable by the user */
    maxDate?: Date | string;
    /** if set, the datepicker will highlight days in the range starting from this date and ending to the hovered or selected date */
    fromDate?: Date | string;
    /** if set, the datepicker will highlight days in the range starting from the hovered or selected date to this value */
    toDate?: Date | string;
    /** set to true to display two month */
    displayTwoMonths?: boolean;
    /** whether the input box should be small or not */
    small?: boolean;
    /** the icon to show in the input field */
    icon?: JSX.Element;
    /** specify an initial "visible" date with no need to select a defaultValue */
    startDate?: Date | string;
    /** locale used for translations */
    locale?: string;
    /** whether the datepicker should be disabled or not */
    disabled?: boolean;
    /** called when the focus changes */
    onFocusChange?: (focus: boolean) => void;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
  };
}

export type State = {
  value?: moment.Moment;
  hoveredDay?: moment.Moment;
  focused: boolean;
};

/*
 * TODO: missing rc-datepicker props
 *
 * @param onShow - called when datepicker is opened
 * @param startMode - the start view of the datepicker
 * @param fixedMode - whether the user can use multiple views or not
 * @param showOnInputClick - whether the datepicker should open when user click on the input
 * @param closeOnClickOutside - whether the datepicker should close when user clicks outside of it
 * @param showInputButton - whether the input-button should be rendered
 * @param autoClose - pass true if you want the datepicker to close automatically after the user selects a value
 * @param floating - whether the datepicker should float over the page content (absolute position)
 * @param position - whether the datepicker should be rendered above or below the input field
 * @param iconClassName - classname used for the icon
 * @param iconClearClassName - classname used for the clear icon
 *
 */

const valueToMomentDate: (
  value?: Date | string
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

export const Props = {
  id: t.maybe(t.String),
  value: t.maybe(t.Date),
  defaultValue: t.maybe(t.Date),
  onChange: t.maybe(t.Function),
  onHide: t.maybe(t.Function),
  displayFormat: t.maybe(t.String),
  minDate: t.maybe(t.union([t.Date, t.String])),
  maxDate: t.maybe(t.union([t.Date, t.String])),
  fromDate: t.maybe(t.union([t.Date, t.String])),
  toDate: t.maybe(t.union([t.Date, t.String])),
  displayTwoMonths: t.maybe(t.Boolean),
  small: t.maybe(t.Boolean),
  icon: t.maybe(ReactChild),
  startDate: t.maybe(t.union([t.Date, t.String])),
  locale: t.maybe(t.String),
  onFocusChange: t.maybe(t.Function),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A decent and pretty date picker to be used with React
 */
@props(Props)
export class DatePicker extends React.PureComponent<DatePicker.Props, State> {
  componentWillMount() {
    if (this.props.locale) {
      moment.locale(this.props.locale);
    }
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
      this.setState(
        {
          value: valueToMomentDate(defaultValue)
        },
        () => onChange && onChange(undefined)
      );
    } else {
      this.setState(
        { value },
        () => onChange && onChange(value.toDate() || undefined)
      );
    }
  };

  isDayBlocked = (day: moment.Moment) => {
    const minDate = valueToMomentDate(this.props.minDate);
    const maxDate = valueToMomentDate(this.props.maxDate);

    return (!!minDate && day < minDate) || (!!maxDate && day > maxDate);
  };

  initialVisibleMonth = () => valueToMomentDate(this.props.startDate);

  onFocusChange = ({ focused }: { focused: boolean | null }) => {
    this.setState({ focused: focused || false });
    this.props.onFocusChange && this.props.onFocusChange(focused || false);
  };

  onDayMouseEnter = (day: moment.Moment) => () => {
    if (!this.isDayBlocked(day)) {
      this.setState({ hoveredDay: day });
    }
  };

  onDayMouseLeave = () => {
    this.setState({ hoveredDay: undefined });
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
      "CalendarDay--hovered-span": this.isInRange(day, this.state.hoveredDay),
      "CalendarDay--selected-span": this.isInRange(day, this.state.value)
    });

  dayRenderer = () => (day: moment.Moment) => {
    const className = this.getDayClass(day);

    return (
      <FlexView
        grow
        onMouseEnter={this.onDayMouseEnter(day)}
        onMouseLeave={this.onDayMouseLeave}
        vAlignContent="center"
        hAlignContent="center"
        height="100%"
        className={className}
      >
        {day.format("D")}
      </FlexView>
    );
  };

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
      displayTwoMonths,
      small,
      icon
    } = this.props;

    const wrapperProps = {
      className: cx("date-picker", className, {
        "two-months": displayTwoMonths,
        "is-small": small
      }),
      style
    };

    const datePickerProps = {
      id: id || "",
      date: this.state.value || null,
      onDateChange: this._onChange,
      focused: this.state.focused,
      onFocusChange: this.onFocusChange,
      displayFormat,
      numberOfMonths: displayTwoMonths ? 2 : 1,
      isDayBlocked: this.isDayBlocked,
      renderDay: this.dayRenderer(),
      onClose: this.onClose,
      showClearDate: true,
      enableOutsideDays: true,
      daySize: 30,
      hideKeyboardShortcutsPanel: true,
      navPrev: angleLeftIcon,
      navNext: angleRightIcon,
      customInputIcon: icon || calendarIcon,
      inputIconPosition: "after",
      customCloseIcon: angleRightIcon,
      isOutsideRange: () => false,
      width: "100%"
    };

    return (
      <FlexView {...wrapperProps}>
        <SingleDatePicker {...datePickerProps} />
      </FlexView>
    );
  }
}
