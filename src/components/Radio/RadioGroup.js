/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:41
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-07-26 19:37:31
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import controledInput from '../Common/ControledInput'

let id = 0
const mapDefaultToValue = value => value
const mapValueToValue = value => value
/**
 * Radio组, 自动包含值，name,onchange等维护
 * 可针对form组件进行使用
 */
@controledInput(mapDefaultToValue, mapValueToValue)
export default class RadioGroup extends Component {
  componentWillMount () {
    const { name } = this.props
    this.name = name || `radio-group-name-${++id}`
  }
  handleChange = (e, value) => {
    const { props } = this.props
    props.onChange && props.onChange(value)
  }
  render () {
    const { children, className, disabled, props } = this.props
    const { value } = props
    const classes = classNames('radio-group', className, {
      disabled
    })
    return (
      <div className={classes}>
        {
          children
            ? children.map((child, index) => {
              return React.cloneElement(child, {
                onChange: this.handleChange,
                defaultChecked: value === child.props.value,
                name: this.name,
                key: index,
                disabled
              })
            })
            : ''
        }
      </div>
    )
  }
}
RadioGroup.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** onchange事件 */
  onChange: PropTypes.any,
  /** disabled状态 */
  disabled: PropTypes.bool
}
