/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:10
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-03-27 19:25:10
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ControledInput from '../Common/ControledInput'

let id = 0
/**
 * Checkbox组, 自动包含值，name,onchange等维护
 * 可针对form组件进行使用
 */
class CheckboxGroup extends Component {
  componentWillMount () {
    const { name } = this.props
    this.name = name || `checkbox-group-name-${++id}`
    this.children = []
  }
  onMounted (child) {
    this.children.push(child)
  }
  handleChange (e, val, con) {
    const { props: controled } = this.props
    const { children } = this
    const ret = children
      ? children.filter(child => child.checked).map(child => {
        return child.props.value
      })
      : []
    controled.onChange(ret)
  }
  renderChildren () {
    const { children, disabled, props } = this.props
    const { value } = props
    return children
      ? children.map((child, index) => {
        return React.cloneElement(child, {
          onChange: this.handleChange.bind(this),
          defaultChecked: value
            ? value.indexOf(child.props.value) >= 0
            : false,
          name: this.name,
          key: index,
          onChildCheckBoxMounted: this.onMounted.bind(this),
          disabled
        })
      })
      : ''
  }
  render () {
    const { className, disabled } = this.props
    const classes = classNames('checkbox-group', className, {
      disabled
    })
    return (
      <div className={classes}>
        {
          this.renderChildren()
        }
      </div>
    )
  }
}
CheckboxGroup.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** onchange事件 */
  onChange: PropTypes.any,
  /** disabled状态 */
  disabled: PropTypes.bool
}

const mapDefaultToValue = value => value
const mapValueToValue = value => value

export default ControledInput(CheckboxGroup, mapDefaultToValue, mapValueToValue)
