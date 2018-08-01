/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:00
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-01 17:31:37
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let count = 0
export default class Checkbox extends Component {
  state = {
    checked: false
  }
  componentWillMount () {
    this.id = `checkbox-label-id-${++count}`
    this.checked = this.props.defaultChecked
    this.setState({
      checked: this.checked
    })
  }
  componentDidMount () {
    const { onChildCheckBoxMounted } = this.props
    onChildCheckBoxMounted && onChildCheckBoxMounted(this)
  }
  componentWillReceiveProps (nextProps) {
    const { defaultChecked } = nextProps
    if (defaultChecked !== this.props.defaultChecked) {
      this.setState({
        checked: defaultChecked
      })
      this.checked = defaultChecked
    }
  }
  handleChange (e) {
    const { onChange, value } = this.props
    this.checked = e.target.checked
    this.setState({
      checked: e.target.checked
    })
    onChange && onChange(e, value, this)
  }
  render () {
    const { label, defaultChecked, name, value, className, disabled, style, ...others } = this.props
    const { checked } = this.state
    const classes = classNames('checkbox-label', className, {
      disabled
    })
    return (
      <label htmlFor={this.id} className={classes} style={style}>
        <input
          className="checkbox"
          type="checkbox"
          id={this.id}
          checked={checked}
          name={name}
          value={value}
          disabled={disabled}
          {...others}
          onChange={this.handleChange.bind(this)} />
        {label}
      </label>
    )
  }
}
Checkbox.propTypes = {
  /** checkbox标签描述 */
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
