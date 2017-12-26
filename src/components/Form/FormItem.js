/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:01:33
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-26 19:52:13
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import event from '../../lib/eventProxy'
import validate from './validators'
import classNames from 'classnames'

/**
 * 单个表单元素
 * 自带样式，规则验证等
 * 直接填充表单组件的内容即可
 */
export default class FormItem extends Component {
  constructor () {
    super()
    this.handleInput = this.handleInput.bind(this)
    this.state = {
      hasError: false
    }
  }
  componentWillMount () {
    const { data, field, id } = this.props
    const fieldData = data[field]

    if (!fieldData) {
      throw new Error(`data中缺少正确的field：${field}`)
    }

    const { value, validators } = fieldData
    this.handleInput(value, true)
    this.validators = validators
    this.isRequired = validators
      ? validators.some(validator => {
        return validator.required
      })
      : false
    this.id = id
  }
  validateItem (value) {
    const { validators } = this

    if (!validators) {
      return true
    }

    return !validators.some(rule => {
      if (Array.isArray(value)) {
        if (rule.required) {
          return !validate(value, rule)
        }
        return value.some(i => {
          return !validate(i, rule)
        })
      }
      return !validate(value, rule)
    })
  }
  handleInput (value, first) {
    const { field, onChange } = this.props
    const isOk = this.validateItem(value)

    if (!isOk && !first) {
      this.setState({
        hasError: true
      })
    } else {
      this.setState({
        hasError: false
      })
    }
    event.trigger(`form-field-change-${this.id}`, {
      key: field,
      config: {
        value,
        isOk
      },
      context: this
    })
    onChange && onChange(value)
  }
  renderChildren () {
    const { children, placeholder, data, field } = this.props
    const { hasError } = this.state
    const { value } = data[field]
    return children ? React.cloneElement(children, {
      onChange: this.handleInput,
      defaultValue: value,
      placeholder,
      hasError
    }) : ''
  }
  render () {
    const { label, labelWidth = '100px', labelStyle, className } = this.props
    const { hasError } = this.state
    const lwidth = labelWidth.indexOf('px') > 0 ? labelWidth : labelWidth + 'px'
    const classes = classNames('form-group form-item-group', className)
    return (
      <div className={classes}>
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
