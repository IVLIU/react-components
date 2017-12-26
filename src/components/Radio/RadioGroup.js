/*
 * @Author: wangweixin@threatbook.cn
 * @Date: 2017-12-15 11:02:41
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2017-12-26 11:15:48
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

let id = 0
/**
 * Radio组, 自动包含值，name,onchange等维护
 * 可针对form组件进行使用
 */
export default class RadioGroup extends Component {
  componentWillMount () {
    const { name } = this.props
    this.name = name || `radio-group-name-${++id}`
  }
  handleChange (e, value) {
    const { onChange } = this.props
    onChange && onChange(value)
  }
  render () {
    const { defaultValue, children, className, disabled } = this.props
    const classes = classNames('radio-group', className, {
      disabled
    })
    return (
      <div className={classes}>
        {
          children
            ? children.map((child, index) => {
              return React.cloneElement(child, {
                onChange: this.handleChange.bind(this),
                defaultChecked: defaultValue === child.props.value,
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
