import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'

import Picker from 'rc-calendar/lib/Picker'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import zhCN from 'rc-calendar/lib/locale/zh_CN'
// import enUS from 'rc-calendar/lib/locale/en_US'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'

import ControledInput from '../Common/ControledInput'
import { ranges, getStartAndEndTime } from './constant'
import autobind from 'autobind-decorator'

// const timePickerElement = (
//   <TimePickerPanel
//     defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
//   />
// )
const isValidRange = v => v && v[0] && v[1]
const formatStr = 'YYYY/MM/DD HH:mm'
const format = v => {
  return v ? v.format(formatStr) : ''
}

moment.locale('zh-cn')

const mapDefaultToValue = (defaultValue = 'seven_days') => {
  if (Array.isArray(defaultValue)) {
    return defaultValue
  }
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

@ControledInput(mapDefaultToValue, mapValuetoValue)
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
    value: [],
    open: false
  }
  componentWillMount () {
    const { props } = this.props
    this.setState({
      value: mapDefaultToValue(props.value)
    })
  }
  componentDidMount = () => {
    document.addEventListener('click', this.hide)
  }
  componentWillUnmount = () => {
    document.removeEventListener('click', this.hide)
  }
  hide = (e) => {
    const picker = document.querySelector('.rc-calendar')
    if ((typeof e.target.className === 'string') && e.target.className.indexOf('rc-time') >= 0) return
    if (!picker) return
    if (e.target === findDOMNode(this.input)) return
    if (picker.contains(e.target)) return
    this.setState({
      open: false
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
  handleOpenChange (open) {
    // 只有点击确定的时候，才关闭
    if (open) {
      this.setState({
        open
      })
    }
    return false
  }
  @autobind
  onOk (value) {
    this.props.props.onChange(value)
    this.setState({
      open: false
    })
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
  @autobind
  renderSidebar () {
    const { value } = this.state
    const onChange = (v, index) => {
      value[index] = v
      this.onChange(value)
    }
    return <div className="range-picker-extra-picker-wrap">
      <div className="picker-left">
        <TimePicker
          allowEmpty={false}
          showSecond={false}
          defaultValue={value[0] && value[0].clone()}
          onChange={v => onChange(v, 0)} />
      </div>
      <div className="picker-right">
        <TimePicker
          showSecond={false}
          allowEmpty={false}
          defaultValue={value[1] && value[1].clone()}
          onChange={v => onChange(v, 1)} />
      </div>
    </div>
  }
  render () {
    const { disabled, className, style } = this.props
    const { value, open } = this.state

    const calendar = (
      <RangeCalendar
        ref={picker => (this.picker = picker)}
        disabled={disabled}
        onOk={this.onOk}
        showToday={false}
        renderFooter={this.renderFooter}
        renderSidebar={this.renderSidebar}
        showWeekNumber={false}
        dateInputPlaceholder={['起始时间', '结束时间']}
        locale={zhCN}
        showOk={true}
      />
    )
    return (
      <Picker
        ref={input => (this.input = input)}
        style={style}
        className={className}
        disabled={disabled}
        open={open}
        value={value}
        onChange={this.onChange}
        onOpenChange={this.handleOpenChange}
        animation=""
        calendar={calendar}
      >
        {
          ({ value }) => {
            return <input
              className="input"
              placeholder="请选择时间"
              disabled={disabled}
              readOnly
              value={this.formatDisplayValue(value)}
            />
          }
        }
      </Picker>)
  }
}
