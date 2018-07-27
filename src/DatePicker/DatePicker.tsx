import * as React from 'react';
import * as cx from 'classnames';
import { SingleDatePicker } from 'react-dates';
import FlexView from 'react-flexview';
import { props, t } from '../utils';
import * as moment from 'moment';

export namespace DatePicker {
  export type Value = string | Date | moment.Moment;
  export type OnChangeProps<T extends Value> = {
    /** MomentJS format used to format date before returing through "onChange" */
    returnFormat?: never
    /** called when value changes */
    onChange?: (date?: T) => void
  } | {
    /** MomentJS format used to format date before returing through "onChange" */
    returnFormat: string
    /** called when value changes */
    onChange?: (date?: string) => void
  }

  export type Props<T extends Value> = {
    /** an optional id to pass to top level element of the component */
    id?: string,
    /** current date */
    value?: T,
    /** default date */
    defaultValue?: T,
    /** called when datepicker is closed */
    onHide?: () => void,
    /** MomentJS format used to display current date */
    displayFormat?: string,
    /** called when value is cleared */
    onClear?: () => void,
    /** minimum date selectable by the user */
    minDate?: Value,
    /** maximum date selectable by the user */
    maxDate?: Value,
    /** if set, the datepicker will highlight days in the range starting from this date and ending to the hovered or selected date */
    fromDate?: Value,
    /** if set, the datepicker will highlight days in the range starting from the hovered or selected date to this value */
    toDate?: Value,
    /** set to true to display two month */
    displayTwoMonths?: boolean,
    /** whether the input box should be small or not */
    small?: boolean,
    /** specify an initial "visible" date with no need to select a defaultValue */
    startDate?: Value,
    /** locale used for translations */
    locale?: string,
    /** whether the datepicker should be disabled or not */
    disabled?: boolean,
    /** an optional class name to pass to top level element of the component */
    className?: string,
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties
  } & OnChangeProps<T>;
}

export type State = {
  value?: DatePicker.Value
  hoveredDay?: moment.Moment,
  focused: boolean
}

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

const MomentDate = t.irreducible('MomentDate', x => moment.isMoment(x));
const ValueType = t.union([t.String, t.Date, MomentDate]);

const valueToMomentDate: (value?: DatePicker.Value) => moment.Moment | undefined = value => !value ? undefined : moment(value);

const angleLeftIcon = (
  <svg width="10" height="10" viewBox="0 0 32 32">
    <title>angleLeft</title>
    <path fill="#ffffff" d="M20.747 0.773l-13.333 13.333c-0.479 0.482-0.775 1.146-0.775 1.88s0.296 1.398 0.776 1.88l13.333 13.333c0.492 0.572 1.217 0.932 2.025 0.932 1.473 0 2.667-1.194 2.667-2.667 0-0.809-0.36-1.533-0.929-2.023l-13.337-13.336v3.76l13.333-13.333c0.399-0.463 0.641-1.071 0.641-1.735 0-1.473-1.194-2.667-2.667-2.667-0.664 0-1.271 0.243-1.738 0.644l0.003-0.003z"></path>
  </svg>
);

const angleRightIcon = (
  <svg width="10" height="10" viewBox="0 0 32 32">
    <title>angleRight</title>
    <path fill="#ffffff" d="M7.573 4.56l13.333 13.333v-3.76l-13.333 13.333c-0.399 0.463-0.641 1.071-0.641 1.735 0 1.473 1.194 2.667 2.667 2.667 0.664 0 1.271-0.243 1.738-0.644l13.33-13.33c0.479-0.482 0.775-1.146 0.775-1.88s-0.296-1.398-0.776-1.88l-13.333-13.333c-0.463-0.399-1.071-0.641-1.735-0.641-1.473 0-2.667 1.194-2.667 2.667 0 0.664 0.243 1.271 0.644 1.738l-0.003-0.003z"></path>
  </svg>
);

export const Props = {
  id: t.maybe(t.String),
  value: t.maybe(ValueType),
  defaultValue: t.maybe(ValueType),
  onChange: t.maybe(t.Function),
  onHide: t.maybe(t.Function),
  returnFormat: t.maybe(t.String),
  displayFormat: t.maybe(t.String),
  onClear: t.maybe(t.Function),
  minDate: t.maybe(ValueType),
  maxDate: t.maybe(ValueType),
  fromDate: t.maybe(ValueType),
  toDate: t.maybe(ValueType),
  displayTwoMonths: t.maybe(t.Boolean),
  small: t.maybe(t.Boolean),
  startDate: t.maybe(ValueType),
  locale: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A decent and pretty date picker to be used with React
 */
@props(Props)
export class DatePicker<T extends DatePicker.Value = never> extends React.PureComponent<DatePicker.Props<T>, State> {


  componentWillMount() {
    if (this.props.locale) {
      moment.locale(this.props.locale);
    }
  }

  componentWillReceiveProps(newProps: DatePicker.Props<T>) {
    if (newProps.locale !== this.props.locale) {
      moment.locale(newProps.locale);
    }
  }

  state = {
    value: valueToMomentDate(this.props.defaultValue || this.props.value),      // needed to handle defaultValue
    hoveredDay: undefined,
    focused: false
  }

  _onChange = (value: moment.Moment | null) => {
    const { returnFormat, defaultValue, onClear, onChange } = this.props;
    if (!value) {
      this.setState({
        value: valueToMomentDate(defaultValue)
      }, onClear);
    } else {
      const _value = returnFormat ? value.format(returnFormat) : value;
      this.setState({ value }, () => onChange && (onChange as any)(_value || undefined));
    }
  }

  isDayBlocked = (day: moment.Moment) => {
    const minDate = valueToMomentDate(this.props.minDate);
    const maxDate = valueToMomentDate(this.props.maxDate);

    return (!!minDate && day < minDate) || (!!maxDate && day > maxDate);
  }

  initialVisibleMonth = () => valueToMomentDate(this.props.startDate)

  onFocusChange = ({ focused }: { focused: boolean | null }) => {
    this.setState({ focused: focused || false });
  }

  onDayMouseEnter = (day: moment.Moment) => () => {
    if (!this.isDayBlocked(day)) {
      this.setState({ hoveredDay: day });
    }
  }

  onDayMouseLeave = () => {
    this.setState({ hoveredDay: undefined });
  }

  isInRange = (day: moment.Moment, referenceDay?: moment.Moment) => {
    const { props: { fromDate: _fromDate, toDate: _toDate } } = this;
    if ((!_fromDate && !_toDate) || !referenceDay) {
      return undefined;
    }

    const fromDate = _fromDate ? valueToMomentDate(_fromDate) : undefined;
    const toDate = _toDate ? valueToMomentDate(_toDate) : undefined;

    const isForwardRange = fromDate && day >= fromDate && day <= referenceDay;
    const isBackwardRange = toDate && day <= toDate && day >= referenceDay;

    return isForwardRange || isBackwardRange;
  }

  getDayClass = (day: moment.Moment) => cx({
    'CalendarDay--hovered-span': this.isInRange(day, this.state.hoveredDay),
    'CalendarDay--selected-span': this.isInRange(day, this.state.value)
  })

  dayRenderer = () => (day: moment.Moment) => {

    const className = this.getDayClass(day);

    return (
      <FlexView
        grow
        onMouseEnter={this.onDayMouseEnter(day)}
        onMouseLeave={this.onDayMouseLeave}
        vAlignContent='center'
        hAlignContent='center'
        height='100%'
        className={className}
      >
        {day.format('D')}
      </FlexView>
    );
  }

  onClose = () => {
    this.setState({
      hoveredDay: undefined
    }, this.props.onHide);
  }

  render() {
    const { id, className, style, displayFormat, displayTwoMonths, small } = this.props;

    const wrapperProps = {
      className: cx('date-picker', className, { 'two-months': displayTwoMonths, 'is-small': small }),
      style,
      grow: true
    };

    const datePickerProps = {
      id: id || '',
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
      customCloseIcon: angleRightIcon,
      isOutsideRange: () => false,
      width: '100%'
    };

    return (
      <FlexView {...wrapperProps}>
        <SingleDatePicker {...datePickerProps} />
      </FlexView>
    );
  }
}
