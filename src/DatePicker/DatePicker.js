import React from 'react';
import cx from 'classnames';
import { SingleDatePicker } from 'react-dates';
import FlexView from 'react-flexview';
import { props, t, skinnable } from '../utils';
import moment from 'moment';
import Icon from '../Icon';

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
const Value = t.union([t.String, t.Date, MomentDate]);

const valueToMomentDate = value => !value || MomentDate.is(value) ? value : moment(value);

export const Props = {
  id: t.maybe(t.String),
  value: t.maybe(Value),
  defaultValue: t.maybe(Value),
  onChange: t.maybe(t.Function),
  onHide: t.maybe(t.Function),
  returnFormat: t.maybe(t.String),
  displayFormat: t.maybe(t.String),
  onClear: t.maybe(t.Function),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  fromDate: t.maybe(Value),
  toDate: t.maybe(Value),
  displayTwoMonths: t.maybe(t.Boolean),
  small: t.maybe(t.Boolean),
  startDate: t.maybe(Value),
  locale: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A decent and pretty date picker to be used with React
 * @param id - id
 * @param value - current date
 * @param defaultValue - default date
 * @param onChange - called when value changes
 * @param onHide - called when datepicker is closed
 * @param returnFormat - MomentJS format used to format date before returing through "onChange"
 * @param displayFormat - MomentJS format used to display current date
 * @param onClear - called when value is cleared
 * @param minDate - minimum date selectable by the user
 * @param maxDate - maximum date selectable by the user
 * @param fromDate - if set, the datepicker will highlight days in the range starting from this date and ending to the hovered or selected date
 * @param toDate -if set, the datepicker will highlight days in the range starting from the hovered or selected date to this value
 * @param displayTwoMonths - set to true to display two month
 * @param small - whether it's small or not
 * @param startDate - specify an initial "visible" date with no need to select a defaultValue
 * @param locale - locale used for translations
 * @param disabled - whether the datepicker should be disabled or not
 */
@skinnable()
@props(Props)
export default class DatePicker extends React.PureComponent {

  static defaultProps = {
    disabled: false,
    displayTwoMonths: false,
    small: false
  }

  componentWillMount() {
    if (this.props.locale) {
      moment.locale(this.props.locale);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.locale !== this.props.locale) {
      moment.locale(newProps.locale);
    }
  }

  state = {
    value: valueToMomentDate(this.props.defaultValue || this.props.value),      // needed to handle defaultValue
    hoveredDay: undefined,
    focused: false
  }

  _onChange = value => {
    const { returnFormat, defaultValue, onClear, onChange } = this.props;
    const _value = returnFormat ? value.format(returnFormat) : value;
    if (!value) {
      this.setState({
        value: valueToMomentDate(defaultValue)
      }, onClear);
    } else {
      this.setState({ value }, () => onChange(_value));
    }
  }

  isDayBlocked = day => {
    const minDate = this.props.minDate ? valueToMomentDate(this.props.minDate) : undefined;
    const maxDate = this.props.maxDate ? valueToMomentDate(this.props.maxDate) : undefined;

    return (!!minDate && day < minDate) || (!!maxDate && day > maxDate);
  }

  initialVisibleMonth = () => valueToMomentDate(this.props.startDate)

  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  }

  onDayMouseEnter = day => () => {
    if (!this.isDayBlocked(day)) {
      this.setState({ hoveredDay: day });
    }
  }

  onDayMouseLeave = () => {
    this.setState({ hoveredDay: null });
  }

  isInRange = (day, referenceDay) => {
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

  getDayClass = day => cx({
    'CalendarDay--hovered-span': this.isInRange(day, this.state.hoveredDay),
    'CalendarDay--selected-span': this.isInRange(day, this.state.value)
  })

  dayRenderer = () => day => {

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
      hoveredDay: null
    }, this.props.onHide);
  }

  getLocals({ id, className, style, displayFormat, displayTwoMonths, small }) {
    return {
      wrapperProps: {
        className: cx('date-picker', className, { 'two-months': displayTwoMonths, 'is-small': small }),
        style
      },
      datePickerProps: {
        id,
        date: this.state.value,
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
      }
    };
  }

  template({ wrapperProps, datePickerProps }) {
    return (
      <FlexView {...wrapperProps}>
        <SingleDatePicker {...datePickerProps} />
      </FlexView>
    );
  }
}
