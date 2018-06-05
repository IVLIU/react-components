/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:01:33
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-06-05 19:57:49
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import validate from './validators'
import classNames from 'classnames'
import formDataMap from './formDataMap'

/**
 * 单个表单元素
 * 自带样式，规则验证等
 * 直接填充表单组件的内容即可
 */
export default class FormItem extends Component {
  constructor() {
    super()
    this.handleInput = this.handleInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.state = {
      hasError: false
    }
  }
  componentWillMount() {
    const { data, field, id } = this.props
    const fieldData = data[field]
    this.id = id
    this.trigger = fieldData ? (fieldData.trigger || 'input') : 'input'
    if (!field) {
      return
    }
    if (!fieldData) {
      throw new Error(`data中缺少正确的field：${field}`)
    }
    const { value, validators } = fieldData
    this.validators = validators
    this.handleInput(value, true)
    this.isRequired = validators
      ? validators.some(validator => {
        return validator.required
      })
      : false
  }
  validateItem(value) {
    const { validators } = this
    const curDataMap = formDataMap.get(this.id)
    const curData = this.getCurData(curDataMap)
    if (!validators) {
      return true
    }
    return !validators.some(rule => {
      if (Array.isArray(value)) {
        if (rule.required) {
          return !validate(value, rule)
        }
        return value.some(i => {
          return !validate(i, rule, curData)
        })
      }
      return !validate(value, rule, curData)
    })
  }
  getCurData(dataMap) {
    let ret = {}
    Object.keys(dataMap).forEach(key => {
      ret[key] = dataMap[key].value
    })
    return ret
  }
  handleInput(value, first) {
    const { field, onChange } = this.props
    let isOk = this.validateItem(value, 'input')

    if (this.trigger === 'input') {
      if (!isOk && !first) {
        this.setState({
          hasError: true
        })
      } else {
        this.setState({
          hasError: false
        })
      }
    }
    formDataMap.setByItemKey(this.id, field, {
      value,
      isOk,
      context: this
    })
    onChange && onChange(value)
  }
  handleBlur(e) {
    const value = e.target.value
    const { field } = this.props
    if (this.trigger !== 'blur') return
    const isOk = this.validateItem(value)
    this.setState({
      hasError: !isOk
    })
    formDataMap.setByItemKey(this.id, field, {
      value,
      isOk,
      context: this
    })
  }
  renderChildren() {
    const { children, placeholder, data, field, showInfo } = this.props
    const { hasError } = this.state
    const { value } = data[field] || {}

    if (showInfo) {
      return <div className="form-item-info">
        {value}
      </div>
    }
    return children ? React.cloneElement(children, {
      onChange: this.handleInput,
      onBlur: this.handleBlur,
      defaultValue: value,
      placeholder,
      hasError
    }) : ''
  }
  render() {
    const { label, labelWidth = '100px', labelStyle, className, style } = this.props
    const { hasError } = this.state
    const lwidth = labelWidth.indexOf('px') > 0 ? labelWidth : labelWidth + 'px'
    const classes = classNames('form-group form-item-group', className)
    return (
      <div className={classes} style={style}>
        <div className={`form-item-title-label ${this.isRequired ? 'required' : ''}`}
          style={{ flex: `0 0 ${lwidth}`, ...labelStyle }}>
          <span>{label}</span> :
        </div>
        <div className={`form-item-input ${hasError ? 'has-error' : ''}`}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}
FormItem.displayName = 'FormItem'
FormItem.defaultProps = {
  trigger: 'input'
}
FormItem.propTypes = {
  /** 表单元素的标签 */
  label: PropTypes.any,
  /** 标签宽度 */
  labelWidth: PropTypes.string,
  /** 标签的特殊样式 */
  labelStyle: PropTypes.object,
  /**
   * 标签对应的field, 即最终数据中的属性
   * 若data中包含对应field的defaultValue,validators
   * 后续可不用传入
   */
  field: PropTypes.string.isRequired,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 验证规则 */
  validators: PropTypes.array,
  /** placeholder */
  placeholder: PropTypes.string
}
