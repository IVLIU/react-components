/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-18 17:51:18
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-01-22 11:30:36
 */
import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

@pureRender
export default class Textarea extends Component {
  constructor (props) {
    super(props)
    const { defaultValue } = props
    this.state = {
      value: defaultValue,
      focus: false
    }
  }
  componentWillReceiveProps (nextProps) {
    const { value } = nextProps
    if (value && value !== 0) {
      this.setState({
        value
      })
    }
  }
  @autobind
  handleChange (e) {
    const { onChange } = this.props
    const value = e.target.innerText
    this.setState({
      value
    })
    onChange && onChange(value)
  }
  @autobind
  handleFocus () {
    this.setState({
      focus: true
    })
  }
  @autobind
  handleBlur () {
    this.setState({
      focus: false
    })
  }
  render () {
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
            onInput={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder={placeholder}
          >
            {defaultValue}
          </div>
          <span className="max"><i>{value.length}</i>/{max}</span>
        </div>
      )
    }
  }
}
Textarea.defaultProps = {
  defaultValue: ''
}
