/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:52:04
 * @Last Modified by: zsj
 * @Last Modified time: 2018-07-16 10:26:44
 */
import React from 'react'
import ControledInput from '../Common/ControledInput'
import classNames from 'classnames'
import MultiSelectValue from '../MultiInput/MultiSelectValue'
import Icon from '../Icon'
import delIcon from '@/images/svg/del_icon.svg'
import RSelect from 'react-select'
import PropTypes from 'prop-types'

// 设置默认显示的defaultValue
const mapDefaultToValue = (value, props) => {
  const { multi, options } = props
  // 没传
  if (!value && value !== 0) {
    return multi ? [] : ''
  }
  return multi
    ? options.filter(item => value.indexOf(item.value) >= 0)
    : options.filter(item => item.value === value)[0]
}
const mapValueToValue = (value, props) => {
  const { multi } = props
  return multi
    ? value.map(item => item.value)
    : value ? value.value : ''
}

const Select = (props) => {
  const { options, className, hasError,
    multi, disabled, props: controled,
    clearable, theme, ...others } = props
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
      options={options}
      clearRenderer={() => <Icon className="del-icon" link={delIcon} />}
      arrowRenderer={({ isOpen }) => <span className={`drop-down-icon ${isOpen ? 'up' : ''}`}></span>}
      {...others}
      {...config}
      {...controled}/>
  )
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
  /** 默认值，且数组是不能包含对象 */
  defaultValue: PropTypes.array,
  /** change回调 */
  onChange: PropTypes.func,
  /** 可选主题颜色 default, white */
  theme: PropTypes.string
}
export default ControledInput(Select, mapDefaultToValue, mapValueToValue)
