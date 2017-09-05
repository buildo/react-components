import * as React from 'react';
import cx = require('classnames');
import { SingleDatePicker } from 'react-dates';
import FlexView from 'react-flexview';
import { props, t } from '../utils';
import * as moment from 'moment';
import Icon from '../Icon';

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

export type DatePickerProps<T extends Value> = {
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

export type DatePickerState = {
  value?: Value
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

const valueToMomentDate: (value?: Value) => moment.Moment | undefined = value => !value ? undefined : moment(value);

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
export default class DatePicker<T extends Value = never> extends React.PureComponent<DatePickerProps<T>, DatePickerState> {


  componentWillMount() {
    if (this.props.locale) {
      moment.locale(this.props.locale);
    }
  }

  componentWillReceiveProps(newProps: DatePickerProps<T>) {
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
      style
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
      navPrev: <Icon icon='angleLeft' />,
      navNext: <Icon icon='angleRight' />,
      customCloseIcon: <Icon icon='angleRight' />
    };

    return (
      <FlexView {...wrapperProps}>
        <SingleDatePicker {...datePickerProps} />
      </FlexView>
    );
  }
}
