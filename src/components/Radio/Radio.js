/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:29
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-15 11:11:46
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let count = 0
export default class Radio extends Component {
  componentWillMount () {
    this.id = `radio-label-id-${++count}`
  }
  handleChange (e) {
    const { onChange, value } = this.props
    onChange && onChange(e, value)
  }
  render () {
    const { label, defaultChecked, name, className, value } = this.props
    const classes = classNames('radio-label', className)
    return (
      <label htmlFor={this.id} className={classes}>
        <input
          className="radio"
          type="radio"
          id={this.id}
          defaultChecked={defaultChecked}
          name={name}
          value={value}
          onChange={this.handleChange.bind(this)} />
        {label}
      </label>
    )
  }
}
Radio.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}
