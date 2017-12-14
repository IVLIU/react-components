import React, { Component } from 'react'
import PropTypes from 'prop-types'
import event from '../../lib/eventProxy'
import validate from './validators'
// import './form.css'

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
    const { field } = this.props
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
  }
  renderChildren () {
    const {children, defaultValue, placeholder} = this.props
    return children ? React.cloneElement(children, {
      onChange: this.handleInput,
      defaultValue,
      placeholder
    }) : ''
  }
  render () {
    const { label, labelWidth = '100px', labelStyle } = this.props
    const { hasError } = this.state
    const lwidth = labelWidth.indexOf('px') > 0 ? labelWidth : labelWidth + 'px'
    return (
      <div className="form-group form-item-group">
        <div className={`form-item-title-label ${this.isRequired ? 'required' : ''}`}
          style={{ flex: `0 0 ${lwidth}`, ...labelStyle }}>
          <span>{label}</span>:
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
