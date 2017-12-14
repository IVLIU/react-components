/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-11-30 17:11:32
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-11 19:08:12
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class InputText extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: '',
      focus: false
    }
    this.changeInputText = this.changeInputText.bind(this)
  }
  handleFocus () {
    this.setState({
      focus: true
    })
  }
  handleBlur () {
    this.setState({
      focus: false
    })
  }
  changeInputText (e) {
    const { onChange } = this.props
    const value = e.target.value || e.target.innerText
    onChange && onChange(value)
    this.setState({
      value
    })
  }
  renderTextArea () {
    const { defaultValue, max, onChange,
      onInput, className = {}, placeholder,
      hasError, disabled, ...others } = this.props
    const { value, focus } = this.state

    if (max) {
      const classes = classNames(
        'input', 'textarea', 'textarea-wrap', {
          error: hasError,
          'is-disabled': disabled,
          focus
        },
        ...className
      )
      return (
        <div className={classes}>
          <div {...others}
            contentEditable={disabled ? 'false' : 'true'}
            className="textarea-content"
            onInput={this.changeInputText || onInput || onChange}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            placeholder={placeholder}
          >
            {defaultValue}
          </div>
          <span className="max"><i>{value.length}</i>/{max}</span>
        </div>
      )
    }
    const classes = classNames('input', 'textarea', {
      error: hasError,
      ...className
    })
    return (
      <textarea defaultValue={defaultValue} className={classes}
        {...others}
        disabled={disabled}
        onInput={this.changeInputText || onInput || onChange}
        type="text"
      >
      </textarea>
    )
  }
  render () {
    const { defaultValue, type, onChange, onInput, hasError, ...others } = this.props

    if (type === 'textarea') {
      return this.renderTextArea()
    }
    const classes = classNames('input', {
      'error': hasError
    })
    return (
      <input defaultValue={defaultValue}
        className={classes}
        onChange={this.changeInputText || onChange || onInput}
        type="text"
        {...others}
      />
    )
  }
}

InputText.displayName = 'InputText'
InputText.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string
}
InputText.defaultProps = {}
