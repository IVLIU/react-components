/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:01:33
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-20 17:21:30
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import event from '../../lib/eventProxy'
import validate from './validators'
import classNames from 'classnames'

export default class FormItem extends Component {
  constructor () {
    super()
    this.handleInput = this.handleInput.bind(this)
    this.state = {
      hasError: false
    }
  }
  componentWillMount () {
    const { defaultValue, validators } = this.props
    this.handleInput(defaultValue, true)
    this.isRequired = validators
      ? validators.some(validator => {
        return validator.required
      })
      : false
  }
  validateItem (value) {
    const { validators } = this.props

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
    event.trigger('form-field-change', {
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
    const {children, defaultValue, placeholder} = this.props
    const { hasError } = this.state
    return children ? React.cloneElement(children, {
      onChange: this.handleInput,
      defaultValue,
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
  label: PropTypes.any,
  children: PropTypes.any,
  field: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  validators: PropTypes.array,
  labelWidth: PropTypes.string
}
