/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:29
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-26 11:29:53
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let count = 0

/**
 * 对Radio进行简单的封装
 * 并没有进行样式的修改
 */
export default class Radio extends Component {
  componentWillMount () {
    this.id = `radio-label-id-${++count}`
  }
  handleChange (e) {
    const { onChange, value } = this.props
    onChange && onChange(e, value)
  }
  render () {
    const { label, defaultChecked, name, className, value, disabled } = this.props
    const classes = classNames('radio-label', className, {
      disabled
    })
    return (
      <label htmlFor={this.id} className={classes}>
        <input
          className="radio"
          type="radio"
          id={this.id}
          defaultChecked={defaultChecked}
          name={name}
          value={value}
          disabled={disabled}
          onChange={this.handleChange.bind(this)} />
        {label}
      </label>
    )
  }
}
Radio.propTypes = {
  /** radio标签描述 */
  label: PropTypes.string,
  /** 是否默认选中 */
  defaultChecked: PropTypes.bool,
  /** 表单name属性 */
  name: PropTypes.string,
  /** 该选项对应的值，会在onChange时传入回调 */
  value: PropTypes.any,
  /** 值更改时的回调 */
  onChange: PropTypes.func,
  /** 禁用状态 */
  disabled: PropTypes.bool
}
