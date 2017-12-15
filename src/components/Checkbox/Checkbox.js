/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:00
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-15 11:08:11
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let count = 0
export default class Checkbox extends Component {
  componentWillMount () {
    this.id = `checkbox-label-id-${++count}`
    this.checked = this.props.defaultChecked
  }
  componentDidMount () {
    const { onChildCheckBoxMounted } = this.props
    onChildCheckBoxMounted && onChildCheckBoxMounted(this)
  }
  handleChange (e) {
    const { onChange, value } = this.props
    this.checked = e.target.checked
    onChange && onChange(e, value, this)
  }
  render () {
    const { label, defaultChecked, name, value, className } = this.props
    const classes = classNames('checkbox-label', className)
    return (
      <label htmlFor={this.id} className={classes}>
        <input
          className="checkbox"
          type="checkbox"
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
Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}
