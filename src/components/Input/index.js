/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-11-30 17:11:32
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-25 17:34:56
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * 基本的输入框组件
 * 包括text, textarea两种类型
 */
export default class Input extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: '',
      focus: false
    }
    this.changeInputText = this.changeInputText.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    const { value } = nextProps
    if (value && value !== 0) {
      this.setState({
        value
      })
    }
  }
  componentWillMount () {
    const { defaultValue } = this.props
    if (defaultValue && defaultValue !== 0) {
      this.setState({
        value: defaultValue
      })
    }
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
      onInput, className, placeholder,
      hasError, disabled, ...others } = this.props
    const { value, focus } = this.state

    if (max) {
      const classes = classNames(
        'input', 'textarea', 'textarea-wrap', {
          error: hasError,
          'is-disabled': disabled,
          focus
        },
        className
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
      error: hasError
    }, className)
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
    const { defaultValue, value: v, type, onChange, onInput, hasError, className, ...others } = this.props
    const { value } = this.state
    if (type === 'textarea') {
      return this.renderTextArea()
    }
    const classes = classNames('input', {
      'error': hasError
    }, className)
    return (
      <input
        onChange={this.changeInputText || onInput || onChange}
        value={value}
        className={classes}
        value={value}
        type="text"
        {...others}
      />
    )
  }
}

Input.displayName = 'Input'
Input.propTypes = {
  /** 输入内容改变时的回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.string,
  /** 主动修改组件值时候的值， @see controled input */
  value: PropTypes.string,
  /** 类型 */
  type: PropTypes.oneOf(['text', 'textarea']),
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool,
  /** 当type为textarea时，设置max,则会显示当前输入的字数 */
  max: PropTypes.num || null
}
Input.defaultProps = {}
