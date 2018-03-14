import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import DateRangePicker from 'react-bootstrap-daterangepicker'
// import classNames from 'classnames'
import moment from 'moment'

import controledInput from '../Common/ControledInput'
import { ranges, timeLocale, getStartAndEndTime } from './constant'

class DateRange extends Component {
  render () {
    const { className, props: controled, options, ...others } = this.props
    // const classes = classNames('radio-btn', className)
    const { value, onChange } = this.props.props
    return (
      <DateRangePicker startDate={value.start}
        {...others}
        endDate={value.end}
        timePicker
        timePicker24Hour
        locale={timeLocale}
        ranges={ranges}
        opens="right"
        onApply={onChange}>
        <input type="text" className="form-control input" />
      </DateRangePicker>
    )
  }
}

const mapDefaultToValue = (defaultValue = 'seven_days', { options = [] }) => {
  const ret = typeof defaultValue === 'string'
    ? getStartAndEndTime(defaultValue)
    : defaultValue
  return {
    start: ret && ret.start ? moment(ret.start) : moment(new Date()),
    end: ret && ret.end ? moment(ret.end) : moment(new Date())
  }
}
const mapValuetoValue = (e, props, picker) => {
  return {
    start: picker.startDate.valueOf(),
    end: picker.endDate.valueOf()
  }
}

export default controledInput(DateRange, mapDefaultToValue, mapValuetoValue)
