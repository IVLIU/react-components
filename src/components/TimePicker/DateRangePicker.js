import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Picker from 'rc-calendar/lib/Picker'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import zhCN from 'rc-calendar/lib/locale/zh_CN'
// import enUS from 'rc-calendar/lib/locale/en_US'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import moment from 'moment'
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'

import { controledInputDecorator } from '../Common/ControledInput'
import { ranges, getStartAndEndTime } from './constant'
import Input from '../Input'
import autobind from 'autobind-decorator'

const timePickerElement = (
  <TimePickerPanel
    defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
  />
)
const isValidRange = v => v && v[0] && v[1]
const formatStr = 'YYYY/MM/DD HH:mm:ss'
const format = v => {
  return v ? v.format(formatStr) : ''
}

moment.locale('zh-cn')

const mapDefaultToValue = (defaultValue = 'seven_days') => {
  const ret = typeof defaultValue === 'string'
    ? getStartAndEndTime(defaultValue)
    : defaultValue
  return [
    ret && ret.start ? moment(ret.start) : moment(new Date()),
    ret && ret.end ? moment(ret.end) : moment(new Date())
  ]
}
const mapValuetoValue = (value) => ({
  start: +value[0],
  end: +value[1]
})

@controledInputDecorator(mapDefaultToValue, mapValuetoValue)
export default class DateRangePicker extends Component {
  static propTypes = {
    /** 默认值, 'seven_days'时间区间，或者{start, end}对象 */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    /** 回调 */
    onChange: PropTypes.func
  }
  state = {
    value: []
  }
  componentWillMount () {
    const { props } = this.props
    this.setState({
      value: mapDefaultToValue(props.value)
    })
  }
  componentWillReceiveProps (nextProps) {
    const { props } = this.props
    const { props: nextP } = nextProps
    if (props.value !== nextP.value) {
      this.setState({
        value: mapDefaultToValue(nextP.value)
      })
    }
  }
  @autobind
  onChange (value) {
    this.setState({
      value
    })
  }
  formatDisplayValue (value) {
    return isValidRange(value) ? `${format(value[0])} - ${format(value[1])}` : ''
  }
  @autobind
  renderFooter () {
    const operations = Object.keys(ranges).map(range => {
      return <a onClick={() => this.onChange(ranges[range])}>
        {range}
      </a>
    })
    return <div className="range-picker-extra-footer-wrap">
      {operations}
    </div>
  }
  render () {
    const { disabled, props, className, style } = this.props
    const { value } = this.state

    const calendar = (
      <RangeCalendar
        disabled={disabled}
        onOk={props.onChange}
        showToday={false}
        renderFooter={this.renderFooter}
        showWeekNumber={false}
        dateInputPlaceholder={['起始时间', '结束时间']}
        locale={zhCN}
        timePicker={timePickerElement}
      />
    )
    return (
      <Picker
        style={style}
        className={className}
        disabled={disabled}
        value={value}
        onChange={this.onChange}
        animation="slide-up"
        calendar={calendar}
      >
        {
          ({ value }) => {
            return (<span>
              <Input
                placeholder="请选择时间"
                disabled={disabled}
                readOnly
                defaultValue={this.formatDisplayValue(value)}
              />
            </span>)
          }
        }
      </Picker>)
  }
}
