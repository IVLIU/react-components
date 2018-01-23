/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:03:03
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-01-18 17:22:57
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import RSelect from 'react-select'
import MultiSelectValue from '../MultiInput/MultiSelectValue'
import Icon from '../Icon'
import delIcon from '@/images/svg/del_icon.svg'

/**
 * react-select二次封装
 * @see https://github.com/JedWatson/react-select
 */
export default class Select extends Component {
  constructor (props) {
    super(props)
    const { multi } = props
    this.state = {
      value: multi ? [] : ''
    }
  }
  componentWillMount () {
    const { defaultValue, options } = this.props

    if (!defaultValue && defaultValue !== 0) {
      return
    }

    if (Array.isArray(defaultValue)) {
      const ret = options.filter(item => defaultValue.indexOf(item.value) >= 0)
      this.setState({
        value: ret
      })
    } else {
      const ret = options.filter(item => item.value === defaultValue)
      this.setState({
        value: ret[0]
      })
    }
  }
  handleChange (value) {
    const { onChange, disabled, multi } = this.props
    if (disabled) {
      return
    }
    this.setState({
      value
    })
    const ret = multi
      ? value.map(item => item.value)
      : value.value
    onChange && onChange(ret)
  }

  render () {
    const { options, className, hasError, multi, disabled, clearable, theme } = this.props
    const classes = classNames('select', {
      error: hasError,
      [theme]: true
    }, className)
    const config = {
      multi,
      disabled,
      clearable,
      valueComponent: d => <MultiSelectValue {...d} />
    }

    if (!multi) {
      delete config.valueComponent
    }
    return (
      <RSelect
        className={classes}
        value={this.state.value}
        options={options}
        {...config}
        clearRenderer={() => <Icon className="del-icon" link={delIcon} />}
        arrowRenderer={({ isOpen }) => <span className={`drop-down-icon ${isOpen ? 'up' : ''}`}></span>}
        onChange={this.handleChange.bind(this)}/>
    )
  }
}
Select.defaultProps = {
  theme: 'default'
}
Select.propTypes = {
  /** 是否是多选 */
  multi: PropTypes.bool,
  /**
   * 选项
   * {
   *   label: '标签',
   *   value: '值'
   * }
   */
  options: PropTypes.array,
  /** 错误状态 */
  hasError: PropTypes.bool,
  /** disabled状态 */
  disabled: PropTypes.bool,
  /** 是否可清空 */
  clearable: PropTypes.bool,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func,
  /** 可选主题颜色 default, white */
  theme: PropTypes.string
}
